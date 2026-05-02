type Props = { num: string; title: string; caption: string };

export function SectionLabel({ num, title, caption }: Props) {
  return (
    <div className="aur-sec-label">
      <span className="aur-sec-num">{num}</span>
      <h2 className="aur-sec-title">{title}</h2>
      <span className="aur-sec-caption">{caption}</span>
    </div>
  );
}
