import type { Article } from './types';
import { designingComponentsClaudeUnderstands } from './articles/designing-components-claude-understands';
import { reanimated3Worklets } from './articles/reanimated-3-worklets';
import { designTokensNotCssVariables } from './articles/design-tokens-not-css-variables';
import { mcpFromScratch } from './articles/mcp-from-scratch';

export const articles: Article[] = [
  designingComponentsClaudeUnderstands,
  reanimated3Worklets,
  designTokensNotCssVariables,
  mcpFromScratch,
];

export const articleBySlug = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
) as Record<string, Article | undefined>;
