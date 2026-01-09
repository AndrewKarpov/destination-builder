import { type JSX, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { Field, Input, Select } from '@/ui';

import { SecretInput } from '@/custom';

import { type FieldConfig, FieldType } from '@/providers/config';
import { PROVIDER_FIELDS } from '@/providers/config';
import type { ProviderFormValues } from '@/providers/schema';

import styles from './styles.module.css';

export function ProviderForm({ formId, onSubmit }: { formId: string; onSubmit: () => void }) {
  const {
    register,
    watch,
    clearErrors,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext<ProviderFormValues>();

  const provider = watch('provider');
  const fields = PROVIDER_FIELDS[provider];

  useEffect(() => {
    /**
     * Watches for form value changes and clears server-side validation errors
     * for the 'bucket' field when it is modified by the user.
     * 
     * @remarks
     * This subscription automatically clears any server-side errors on the bucket field
     * whenever the user makes changes to it, allowing for real-time error clearing.
     */
    const sub = watch((_, meta) => {
      if (meta.name === 'bucket' && errors.bucket?.type === 'server') {
        clearErrors('bucket');
      }
    });
    return () => sub.unsubscribe();
  }, [watch, errors.bucket, clearErrors]);

  const showError = (name: keyof ProviderFormValues) =>
    isSubmitted || touchedFields[name] || errors[name]?.type === 'server';

  return (
    <>
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className={styles.form}
      >
        <div className={styles.grid}>
          {fields.map((f) => (
            <FieldRow
              key={f.name}
              field={f}
              register={register}
              errors={errors}
              showError={showError}
            />
          ))}
        </div>
      </form>
    </>
  );
}

function FieldRow({
  field,
  register,
  errors,
  showError,
}: {
  field: FieldConfig;
  register: ReturnType<typeof useFormContext<ProviderFormValues>>['register'];
  errors: ReturnType<typeof useFormContext<ProviderFormValues>>['formState']['errors'];
  showError: (name: keyof ProviderFormValues) => boolean;
}) {
  const name = field.name;

  const getFiled = (type: FieldType): JSX.Element => {
    switch (type) {
      case FieldType.SELECT:
        return (
          <Select
            {...register(name)}
            aria-invalid={!!errors[name]?.message}
            options={field.options || []}
          />
        );
      case FieldType.SECRET:
        return (
          <SecretInput
            placeholder={field.placeholder}
            autoComplete="off"
            aria-invalid={!!errors[name]?.message}
            {...register(name)}
          />
        );
      default:
        return (
          <Input
            placeholder={field.placeholder}
            autoComplete="off"
            aria-invalid={!!errors[name]?.message}
            {...register(name)}
          />
        );
    }
  };

  return (
    <Field
      label={field.label}
      data-colspan={field.colSpan ?? 1}
      error={showError(name) ? errors[name]?.message : undefined}
      className={styles.field}
    >
      {getFiled(field.type)}
    </Field>
  );
}
