import type { FormEvent } from 'react';

export interface Image {
  path: string;
  label: string;
  id: number;
}

export interface ImageLoaderProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onDelete: (target: string) => Promise<void>;
  photos: Image[];
}

export interface ImageGridProps {
  filteredList: Image[];
  onDelete: (target: string) => Promise<void>;
}
