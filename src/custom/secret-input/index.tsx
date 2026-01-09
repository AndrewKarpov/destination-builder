import { type HTMLProps, useState } from 'react';

import { Input } from '@/ui';

import EyeIcon from '@/assets/eye.svg?react';

/**
 * A secure input component that toggles between text and password visibility.
 * 
 * @param props - Standard HTML input element properties
 * @returns A rendered input component with a toggleable eye icon to show/hide the password
 * 
 * @example
 * ```tsx
 * <SecretInput placeholder="Enter your password" />
 * ```
 */
export const SecretInput = (props: HTMLProps<HTMLInputElement>) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input {...props} type={visible ? 'text' : 'password'}>
      <Input.Trailing>
        <EyeIcon onClick={() => setVisible(!visible)} />
      </Input.Trailing>
    </Input>
  );
};
