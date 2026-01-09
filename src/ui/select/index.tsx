import type { HTMLProps } from 'react';

import ChevronBottom from '@/assets/chevron-bottom.svg?react';

import { typography } from '../typography';
import './style.css';

type SelectProps = HTMLProps<HTMLSelectElement> & {
  options: ({ value: string; label: string } | string)[];
};

/**
 * A customizable select component that wraps native HTML select with styled UI elements.
 * 
 * @component
 * @param {SelectProps} props - The component props
 * @param {React.ReactNode} [props.children] - Custom option elements. If provided, overrides the options prop
 * @param {Array<string | {value: string; label: string}>} [props.options] - Array of select options. Can be strings or objects with value and label properties
 * @param {Record<string, any>} props - Additional HTML select attributes to spread onto the select element
 * 
 * @returns {React.ReactElement} A wrapped select element with chevron icon and typography styling
 * 
 * @example
 * // With string options
 * <Select options={['Option 1', 'Option 2']} />
 * 
 * @example
 * // With object options
 * <Select options={[
 *   { value: 'opt1', label: 'Option 1' },
 *   { value: 'opt2', label: 'Option 2' }
 * ]} />
 * 
 * @example
 * // With custom children
 * <Select>
 *   <option value="custom">Custom Option</option>
 * </Select>
 */
export const Select = ({ children, options, ...props }: SelectProps) => (
  <div data-ui-select-wrapper {...typography('body')}>
    <select {...props} data-ui-select {...typography('body')}>
      {children
        ? children
        : (options || []).map((option, key) =>
            typeof option === 'string' ? (
              <option key={key} value={option}>
                {option}
              </option>
            ) : (
              <option key={key} value={option.value}>
                {option.label}
              </option>
            )
          )}
    </select>
    <ChevronBottom data-ui-select-icon />
  </div>
);
