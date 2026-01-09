import { useFormContext } from 'react-hook-form';

import { Button, typography } from '@/ui';

import { PROVIDER_ICONS, PROVIDER_LABEL, ProviderId } from '@/providers/config';
import type { ProviderFormValues } from '@/providers/schema';

import styles from './styles.module.css';

export const ProviderPick = ({ onPick }: { onPick: (p: ProviderId) => void }) => {
  const { setValue } = useFormContext<ProviderFormValues>();

  return (
    <>
      <p {...typography('body')}>Choose Provider</p>

      <div className={styles.pickRow}>
        {Object.values(ProviderId).map((provider) => {
          const IconComponent = PROVIDER_ICONS[provider];
          return (
            <Button
              key={provider}
              variant={Button.Variants.Tertiary}
              onClick={() => {
                setValue('provider', provider, { shouldValidate: true });
                onPick(provider);
              }}
            >
              {IconComponent && <IconComponent aria-hidden="true" />}
              {PROVIDER_LABEL[provider]}
            </Button>
          );
        })}
      </div>
    </>
  );
};
