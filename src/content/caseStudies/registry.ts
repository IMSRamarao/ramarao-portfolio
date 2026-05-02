import type { CaseStudy } from './types';
import { dreamDesignSystem } from './dream-design-system';
import { dreamMcp } from './dream-mcp';
import { floridaBlue } from './florida-blue';
import { baylorScottWhite } from './baylor-scott-white';
import { trackItEventManager } from './track-it-event-manager';

export const caseStudies: CaseStudy[] = [
  dreamDesignSystem,
  dreamMcp,
  floridaBlue,
  baylorScottWhite,
  trackItEventManager,
];

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c]),
) as Record<string, CaseStudy | undefined>;
