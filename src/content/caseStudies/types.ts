import type { ReactNode } from 'react';
import type { ProjectMetric } from '../../data';

export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  role: string;
  client: string;
  dek: string;
  metrics: ProjectMetric[];
  stack: string[];
  body: ReactNode;
};
