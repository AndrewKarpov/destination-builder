import type { ElementType, HTMLProps } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AsPropType<T = HTMLElement, P = {}> = HTMLProps<T> &
  P & {
    as?: ElementType;
  };
