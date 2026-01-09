import type { AsPropType } from '../helpers/as-prop-type';
import { typography } from '../typography';
import './style.css';

export const Sizes = {
  Medium: 's-medium',
} as const;

export const Variants = {
  Primary: 'v-primary',
  Secondary: 'v-secondary',
  Tertiary: 'v-tertiary',
} as const;

export type ButtonProps = Omit<AsPropType<HTMLButtonElement>, 'size'> & {
  /**
   * The size of the button.
   * @default Sizes.Medium
   */
  size?: (typeof Sizes)[keyof typeof Sizes];
  /**
   * The variant of the button.
   * @default Variants.Primary
   */
  variant?: (typeof Variants)[keyof typeof Variants];
};

/**
 * A flexible button component that renders as a customizable HTML element.
 * 
 * @param {ButtonProps} props - The button component props
 * @param {React.ElementType} [props.as='button'] - The HTML element or component to render as
 * @param {string} [props.size=Sizes.Medium] - The size variant of the button
 * @param {string} [props.variant=Variants.Primary] - The visual variant of the button
 * @param {React.ReactNode} props.children - The content to display inside the button
 * @param {React.HTMLAttributes<HTMLElement>} props - Additional HTML attributes to spread onto the element
 * 
 * @returns {React.ReactElement} The rendered button element
 * 
 * @example
 * // Basic button
 * <Button>Click me</Button>
 * 
 * @example
 * // Button with custom size and variant
 * <Button size={Sizes.Large} variant={Variants.Secondary}>Submit</Button>
 * 
 * @example
 * // Button rendered as a link
 * <Button as="a" href="/home">Go Home</Button>
 */

export const Button = ({
  as: As = 'button',
  size = Sizes.Medium,
  variant = Variants.Primary,
  children,
  ...props
}: ButtonProps) => (
  <As
    data-ui-button
    data-ui-button-size={size}
    data-ui-button-variant={variant}
    {...typography('body')}
    {...props}
  >
    {children}
  </As>
);

Button.Variants = Variants;
Button.Sizes = Sizes;
