import { PROVIDER_LINKS, ProviderId } from './config';
import type { ProviderFormValues } from './schema';

export function normalizePath(raw?: string) {
  return (raw ?? '').trim().replace(/^\/+/, '');
}

export function buildDestinationUrl(values: ProviderFormValues) {
  const p = normalizePath(values.path);

  const base = PROVIDER_LINKS[values.provider]
    .replace('[bucket]', values.bucket.trim())
    .replace('[region]', values.provider === ProviderId.AWS ? values.region : '');

  return p ? `${base}/${p}` : base;
}

export function buildDestinationJson(values: ProviderFormValues) {
  return {
    destination: {
      url: buildDestinationUrl(values),
      key: values.key,
      secret: values.secret,
    },
  };
}
