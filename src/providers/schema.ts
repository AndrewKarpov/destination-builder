import { z } from 'zod';

import { AWS_REGION_VALUES, ProviderId } from './config';

const Provider = z.enum([ProviderId.AWS, ProviderId.GCP]);

const bucket = z
  .string()
  .min(1, 'Bucket is required')
  .refine((v) => !/[aA]/.test(v), 'Bucket cannot contain letter "a" (demo)');

/**
 * Zod schema object for validating cloud storage provider configuration.
 * @property {Provider} provider - The cloud storage provider type
 * @property {ZodType} bucket - The storage bucket identifier
 * @property {string} [path] - Optional path prefix within the bucket
 * @property {string} key - Access Key ID (minimum 1 character required)
 * @property {string} secret - Secret Access Key (minimum 1 character required)
 */
const base = z.object({
  provider: Provider,
  bucket,
  path: z.string().optional(),
  key: z.string().min(1, 'Access Key ID is required'),
  secret: z.string().min(1, 'Secret Access Key is required'),
});

const Region = z.enum(AWS_REGION_VALUES, { message: 'Region is required' });

const aws = base.extend({
  provider: z.literal(ProviderId.AWS),
  region: Region,
});

const gcp = base.extend({
  provider: z.literal(ProviderId.GCP),
  region: z.string().optional(),
});

export const ProviderFormSchema = z.discriminatedUnion('provider', [aws, gcp]);
export type ProviderFormValues = z.infer<typeof ProviderFormSchema>;
