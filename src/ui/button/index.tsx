import type { AsPropType } from "../helpers/as-prop-type"
import './style.css';

export const Sizes = {
  Medium: 's-medium'
} as const;

export const Variants = {
  Primary: 'v-primary',
  Secondary: 'v-secondary',
  Tertiary: 'v-tertiary'
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
}

export const Button = ({ as: As = 'button', size = Sizes.Medium, variant = Variants.Primary, children, ...props }: ButtonProps) => (
  <As
    data-ui-button
    data-ui-button-size={size}
    data-ui-button-variant={variant}
    {...props}
  >
    {children}
  </As>
);

Button.Variants = Variants;
Button.Sizes = Sizes;
