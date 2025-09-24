import type { FormEvent } from 'react';

export interface Image {
  path: string;
  label: string;
  id: number;
}

export interface ImageGridProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onDelete: (target: string) => Promise<void>;
  photos: Image[];
}
