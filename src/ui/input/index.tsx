import type { HTMLProps } from 'react';

import { typography } from '../typography';
import './style.css';

const Type = {
  password: 'password',
  text: 'text',
} as const;

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'type'> & {
  // Restricted types supported by the Input component
  type?: (typeof Type)[keyof typeof Type];
};

/**
 * Input component that renders a wrapper div with an input element.
 * 
 * @component
 * @example
 * ```tsx
 * <Input type="email" placeholder="Enter email" />
 * ```
 * 
 * @param {InputProps} props - The component props
 * @param {string} [props.type='text'] - The HTML input type attribute
 * @param {React.ReactNode} [props.children] - Child elements to render before the input
 * @param {object} props - Additional HTML input attributes
 * @returns {React.ReactElement} A div wrapper containing children and an input element
 */
export const Input = ({ type = 'text', children, ...props }: InputProps) => (
  <div data-ui-input-wrapper {...typography('body')}>
    {children}
    <input data-ui-input {...typography('body')} type={type} {...props} />
  </div>
);

const Trailing = ({ 'aria-hidden': ariaHidden = true, ...props }) => (
  <div data-ui-input-trailing aria-hidden={ariaHidden} {...props} />
);

Input.Type = Type;
Input.Trailing = Trailing;
