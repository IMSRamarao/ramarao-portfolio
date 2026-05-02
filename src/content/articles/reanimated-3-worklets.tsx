import type { Article } from '../types';

export const reanimated3Worklets: Article = {
  slug: 'reanimated-3-worklets',
  title: 'Reanimated 3: a worklet mental model that sticks',
  dek: 'After two days of debugging a stale closure inside a worklet, I finally have a mental model that survives contact with real apps.',
  tag: 'Mobile',
  readTime: '11 min',
  date: 'March 22, 2026',
  dateISO: '2026-03-22',
  body: (
    <>
      <p>
        The bug took two days. A swipe-to-delete row in a long list would
        register the swipe, animate halfway, and then snap back to its
        starting position about one time in five. The worst kind of bug — not
        broken enough to reproduce on demand, broken enough to ship a TestFlight
        build with a furious comment from QA.
      </p>
      <p>
        The cause was forty characters of code that any reviewer, including me,
        would have approved. A worklet was reading a value from the closure
        that the React render had updated. Some renders, the closure was
        fresh. Some renders, it was stale. The model in my head — "worklets
        run on the UI thread, JS runs on the JS thread, they communicate via
        shared values" — was not wrong, but it was incomplete enough to leave
        room for that bug.
      </p>
      <p>
        This is the model I have now. It has held up against four months of
        production work and hasn't yet led me into another two-day debug
        session.
      </p>

      <h2>The two threads</h2>
      <p>
        React Native runs your code on two threads that matter: the JS thread
        and the UI thread.
      </p>
      <p>
        The JS thread is where your React tree lives. State updates, effects,
        navigation, network calls, every line of business logic in your app —
        all on the JS thread. When the JS thread is busy, the UI freezes.
        That's the entire problem Reanimated exists to solve.
      </p>
      <p>
        The UI thread is the platform's main thread — the one iOS and Android
        use to actually render frames and process touch events. If you can
        move animation logic onto the UI thread, then a frozen JS thread no
        longer means a frozen interaction.
      </p>
      <p>
        Reanimated's job is to ferry small pieces of code over to the UI thread
        and let them run there. Those pieces of code are worklets.
      </p>

      <h2>Worklets are not callbacks</h2>
      <p>
        A worklet looks like a function. It is not, technically, a function. It
        is a recipe for a function that will be reconstructed on the UI thread.
        At build time, the Reanimated Babel plugin scans your source for
        functions tagged with the <code>'worklet'</code> directive and
        transforms them into something that can be serialized, shipped over to
        the UI thread, and reconstituted into a runnable callable there.
      </p>
      <p>
        This means a few non-obvious things are true:
      </p>
      <ul>
        <li>
          A worklet captures its variables by value at the moment it is created,
          not by reference. Whatever you closed over is what you have. If the
          JS-side value changes later, your worklet does not notice.
        </li>
        <li>
          A worklet does not have access to the global scope of the JS thread.
          No <code>fetch</code>, no <code>console.log</code> (well, kind of — see
          below), no React state.
        </li>
        <li>
          A worklet runs synchronously, on the UI thread, often inside the
          render loop. If your worklet takes more than a frame's budget, you
          drop frames. The thing you were trying to make smooth becomes the
          thing you broke.
        </li>
      </ul>

      <h2>Shared values are the bridge</h2>
      <p>
        A shared value is a small object that exists in shared memory.
        Both threads can read it. Both threads can write to it. The UI thread
        is the source of truth for animations: when you animate a shared value,
        the UI thread writes new values every frame and the JS thread can
        observe them when it has a moment to spare.
      </p>
      <p>
        From a worklet, you read and write a shared value through its{' '}
        <code>.value</code> property. That property access has special
        semantics. On read, it returns the most recent value. On write, it
        triggers any registered animation drivers and notifies subscribed
        components. From the JS thread, the same{' '}
        <code>.value</code> access works, with the caveat that writing to it
        from JS schedules a write that the UI thread will pick up — there's no
        guarantee about exactly when.
      </p>
      <p>
        The simplest possible animation, then, is a shared value that gets
        written from a worklet:
      </p>

      <pre><code>{`const offset = useSharedValue(0);

const gesture = Gesture.Pan().onUpdate((e) => {
  offset.value = e.translationX;
});

const style = useAnimatedStyle(() => {
  return { transform: [{ translateX: offset.value }] };
});`}</code></pre>

      <p>
        Three things are happening here that are easy to miss. The{' '}
        <code>onUpdate</code> callback is a worklet. It runs on the UI thread
        every time the gesture handler emits an update — which is often sixty
        times a second on iOS and up to a hundred and twenty on a ProMotion
        display. The <code>useAnimatedStyle</code> callback is also a worklet.
        It re-runs whenever a shared value it reads changes, on the UI thread,
        and the resulting style is applied to the view directly without ever
        crossing the bridge.
      </p>
      <p>
        The whole gesture-to-pixel pipeline runs on the UI thread. The JS
        thread can be busy parsing JSON from a network response and the swipe
        will still be silky.
      </p>

      <h2>runOnJS and runOnUI</h2>
      <p>
        Sometimes a worklet needs to call back to the JS thread. The classic
        case is "the user finished swiping, now mark the row as read in the
        Redux store." Redux dispatches don't run on the UI thread.{' '}
        <code>runOnJS</code> is the escape hatch:
      </p>

      <pre><code>{`const gesture = Gesture.Pan()
  .onUpdate((e) => {
    offset.value = e.translationX;
  })
  .onEnd(() => {
    if (offset.value < -SWIPE_THRESHOLD) {
      runOnJS(markAsRead)(itemId);
    }
    offset.value = withSpring(0);
  });`}</code></pre>

      <p>
        The wrapper is necessary. Calling <code>markAsRead(itemId)</code>{' '}
        directly from inside the worklet would either crash or silently no-op
        depending on the build, because the function reference does not exist
        on the UI thread.
      </p>
      <p>
        <code>runOnUI</code> is the inverse. It takes a worklet defined in the
        JS thread and schedules it to run on the UI thread. You use it less
        often — most of the time you are already inside a worklet when you
        want UI-thread work to happen — but it's the right tool for kicking off
        an animation from a React effect.
      </p>

      <h2>The closure trap that ate two days</h2>
      <p>
        Now we can name the bug. Here is roughly the code that was failing:
      </p>

      <pre><code>{`function Row({ item, onDismiss }: Props) {
  const offset = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = e.translationX;
    })
    .onEnd(() => {
      if (offset.value < -100) {
        runOnJS(onDismiss)(item.id);
      }
      offset.value = withSpring(0);
    });

  // ...
}`}</code></pre>

      <p>
        The <code>onDismiss</code> prop comes from a parent that holds a
        useState. When the parent re-renders, <code>onDismiss</code> is a new
        function reference. The gesture object — and the worklet inside it —
        was created on the first render and captured the original{' '}
        <code>onDismiss</code> in its closure. It never noticed that the
        reference changed.
      </p>
      <p>
        Most of the time it didn't matter, because the original{' '}
        <code>onDismiss</code> would still call into a stable handler higher up
        the tree. But the moment the parent's state shape evolved — adding a
        per-row "muted" toggle that changed which rows could actually be
        dismissed — the stale closure was reading from the original state and
        making the wrong decision.
      </p>
      <p>
        The fix was to memoize the gesture itself based on the props it
        depended on, so that a new gesture object — with a fresh worklet
        closure — was constructed whenever the relevant inputs changed. The
        deeper fix was to internalize that worklets are not React callbacks.
        They do not get re-created on every render. They have to be told,
        explicitly, when their captured world has shifted under them.
      </p>

      <h2>console.log and other debugging tools</h2>
      <p>
        Inside a worklet, <code>console.log</code> appears to do nothing.
        Sometimes it works. Sometimes it doesn't. The honest answer is that
        log output from the UI thread is unreliable, and you should not rely
        on it.
      </p>
      <p>
        The cleanest pattern is to wrap the log in <code>runOnJS</code>:
      </p>

      <pre><code>{`runOnJS(console.log)('offset:', offset.value);`}</code></pre>

      <p>
        Now the call is forwarded to the JS thread, where{' '}
        <code>console.log</code> behaves the way you expect. You can wrap any
        function this way — a useful trick for instrumenting worklets without
        littering them with assertion logic.
      </p>
      <p>
        For real performance work, the React Native perf monitor and the JS
        FPS counter in the dev menu tell you whether your worklets are doing
        their job. If your gesture is smooth at 60fps while the JS FPS counter
        sits at 12fps, your worklets are correctly off the JS thread. If both
        counters drop together, you're animating from React state.
      </p>

      <h2>Three patterns I reach for constantly</h2>

      <h3>Drag-to-dismiss</h3>
      <pre><code>{`const offset = useSharedValue(0);

const gesture = Gesture.Pan()
  .onUpdate((e) => {
    offset.value = e.translationY;
  })
  .onEnd(() => {
    if (Math.abs(offset.value) > DISMISS_THRESHOLD) {
      offset.value = withTiming(
        Math.sign(offset.value) * SCREEN_HEIGHT,
        { duration: 220 },
        () => runOnJS(onDismissed)()
      );
    } else {
      offset.value = withSpring(0);
    }
  });`}</code></pre>
      <p>
        The completion callback fires on the UI thread when the timing
        animation finishes. We hop back to JS to let the parent unmount us.
      </p>

      <h3>Animated FlatList item entrance</h3>
      <pre><code>{`function Row({ index }: { index: number }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      index * 40,
      withSpring(1, { damping: 20 })
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: (1 - opacity.value) * 12 }],
  }));

  return <Animated.View style={style}>{/* ... */}</Animated.View>;
}`}</code></pre>
      <p>
        Note that the spring's progress drives both opacity and translation,
        so they end together — a small detail that makes the entrance feel
        composed rather than coincidental.
      </p>

      <h3>Parallax scroll header</h3>
      <pre><code>{`const scrollY = useSharedValue(0);

const onScroll = useAnimatedScrollHandler({
  onScroll: (e) => {
    scrollY.value = e.contentOffset.y;
  },
});

const headerStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: scrollY.value * 0.5 }],
  opacity: interpolate(scrollY.value, [0, 200], [1, 0.6], 'clamp'),
}));`}</code></pre>
      <p>
        <code>useAnimatedScrollHandler</code> wires the scroll event to the UI
        thread directly. The scroll position never visits JS, so even on a
        list with thousands of items the header transformation is locked to
        the framerate of the device.
      </p>

      <h2>The model, restated</h2>
      <p>
        Worklets are recipes for code that will be reconstituted on the UI
        thread. Shared values are mutable cells in shared memory. Animations
        are sequences of writes to shared values that the UI thread performs
        every frame. <code>runOnJS</code> is your escape hatch back to React
        land.
      </p>
      <p>
        The mistakes are almost always closure mistakes. A worklet captured
        the world it was born into, and the world has moved on without telling
        it. When something feels wrong and you can't find it, ask: which
        variable inside this worklet is supposed to be fresh, and what
        guarantees that it is?
      </p>
      <p>
        That single question would have saved me two days. I'm passing it on
        in the hope it saves you one.
      </p>
    </>
  ),
};
