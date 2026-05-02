import type { ReactNode } from 'react';

export type Article = {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  readTime: string;
  date: string;
  dateISO: string;
  body: ReactNode;
};
