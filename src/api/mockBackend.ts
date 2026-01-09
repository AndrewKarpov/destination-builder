import type { ProviderFormValues } from '../providers/schema';

type Ok = { ok: true };
type Fail = {
  ok: false;
  fieldErrors: Partial<Record<keyof ProviderFormValues, string>>;
};

export async function mockBackendValidate(values: ProviderFormValues): Promise<Ok | Fail> {
  await new Promise((r) => setTimeout(r, 450));

  if (values.bucket.trim().toLowerCase() === 'error') {
    return {
      ok: false,
      fieldErrors: { bucket: 'Backend: "error" is not allowed bucket name' },
    };
  }

  if (/b/i.test(values.bucket)) {
    return {
      ok: false,
      fieldErrors: {
        bucket: 'Backend: bucket cannot contain letter "b" (demo)',
      },
    };
  }

  return { ok: true };
}
