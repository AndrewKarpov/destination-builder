import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldPath, FormProvider, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/ui';

import { ProviderId } from '@/providers/config';
import { ProviderFormSchema, type ProviderFormValues } from '@/providers/schema';
import { buildDestinationJson } from '@/providers/url';

import { mockBackendValidate } from '@/api/mockBackend';

import { ProviderForm } from './provider-form';
import { ProviderPick } from './provider-pick';
import { StorageContainer } from './storage-container';
import styles from './styles.module.css';

const Steps = {
  Pick: 'pick',
  Form: 'form',
} as const;

type Step = (typeof Steps)[keyof typeof Steps];

export function ProviderWizard() {
  const [step, setStep] = useState<Step>(Steps.Pick);
  const [resultJson, setResultJson] = useState<object | null>(null);

  const formId = 'provider-form';

  const methods = useForm<ProviderFormValues>({
    resolver: zodResolver(ProviderFormSchema),
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      provider: 'aws',
      bucket: '',
      path: '',
      region: 'us-west-2',
      key: '',
      secret: '',
    },
  });

  const { control, formState, clearErrors, setError, setValue, getValues } = methods;

  const provider = useWatch({ control, name: 'provider' });

  useEffect(() => {
    if (provider === ProviderId.AWS) {
      const current = getValues('region');
      if (!current) {
        setValue('region', 'us-west-2', { shouldValidate: true });
      }
    }
  }, [provider, getValues, setValue]);

  const onSubmit = methods.handleSubmit(async (raw) => {
    const values = ProviderFormSchema.parse(raw);

    const backend = await mockBackendValidate(values);
    if (!backend.ok) {
      for (const [field, message] of Object.entries(backend.fieldErrors) as Array<
        [FieldPath<ProviderFormValues>, string | undefined]
      >) {
        if (message) setError(field, { type: 'server', message });
      }
      return;
    }

    setResultJson(buildDestinationJson(values));
  });

  const canSave = step === Steps.Form && formState.isValid && !formState.isSubmitting;

  return (
    <>
      <FormProvider {...methods}>
        <StorageContainer
          title="Third-Party Storage"
          footer={
            <>
              <Button
                variant={Button.Variants.Secondary}
                onClick={() => {
                  if (step === Steps.Pick) {
                    console.log('cancel wizard');
                  } else {
                    setStep(Steps.Pick);
                    setResultJson(null);
                    clearErrors();
                  }
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!canSave} form={step === 'form' ? formId : undefined}>
                {formState.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </>
          }
        >
          {step === Steps.Pick ? (
            <ProviderPick
              onPick={(p) => {
                if (p === ProviderId.AWS) setValue('region', 'us-west-2', { shouldValidate: true });
                clearErrors();
                setResultJson(null);
                setStep(Steps.Form);
              }}
            />
          ) : (
            <ProviderForm formId={formId} onSubmit={onSubmit} />
          )}
        </StorageContainer>
      </FormProvider>
      {resultJson && (
        <div className={styles.jsonBox}>
          <pre className={styles.pre}>
            <code>{JSON.stringify(resultJson, null, 2)}</code>
          </pre>
        </div>
      )}
    </>
  );
}
