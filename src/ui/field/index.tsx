import type { HTMLProps } from 'react';

import type { AsPropType } from '../helpers/as-prop-type';
import { typography } from '../typography';
import './style.css';

type FieldProps = AsPropType<HTMLElement> & {
  label: string;
  error?: string;
};

/**
 * Field component that wraps form inputs with optional label and error display.
 * @template As - The HTML element or React component to render as the container
 * @param {FieldProps} props - The component props
 * @param {React.ElementType} [props.as='div'] - The element or component to render as the container
 * @param {React.ReactNode} props.children - The form input element(s) to be wrapped
 * @param {string} [props.label] - Optional label text to display above the input
 * @param {string} [props.error] - Optional error message to display below the input
 * @returns {React.ReactElement} The rendered field component with label and error elements
 */
export const Field = ({ as: As = 'div', children, label, error, ...props }: FieldProps) => (
  <As data-ui-field {...props}>
    <Label label={label}>{children}</Label>
    {error && <Error data-ui-field-error>{error}</Error>}
  </As>
);

type LabelProps = HTMLProps<HTMLLabelElement> & {
  label?: string;
};

const Label = ({ label, children, ...props }: LabelProps) => (
  <label data-ui-field-label {...typography('body')} {...props}>
    {label && <div data-ui-field-label-text>{label}</div>}
    {children}
  </label>
);

type ErrorProps = AsPropType<HTMLElement>;

const Error = ({ as: As = 'div', children, ...props }: ErrorProps) => (
  <As aria-live="polite" {...typography('body', 'small', 'light')} {...props}>
    {children}
  </As>
);
