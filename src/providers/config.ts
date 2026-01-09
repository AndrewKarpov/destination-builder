import type { ComponentType, SVGProps } from 'react';

import AwsIcon from '@/assets/aws.svg?react';
import GcpIcon from '@/assets/gcp.svg?react';

/**
 * Unique identifiers for supported cloud providers.
 * @const
 */
export const ProviderId = {
  AWS: 'aws',
  GCP: 'gcp',
} as const;

export type ProviderId = (typeof ProviderId)[keyof typeof ProviderId];

/**
 * Mapping of provider IDs to their human-readable labels.
 * @remarks
 * This record provides display names for each supported cloud provider.
 * @example
 * const label = PROVIDER_LABEL[ProviderId.AWS]; // 'AWS'
 */
export const PROVIDER_LABEL: Record<ProviderId, string> = {
  [ProviderId.AWS]: 'AWS',
  [ProviderId.GCP]: 'Google Cloud',
};

export const PROVIDER_OPTIONS: SelectOption<ProviderId>[] = [
  { value: ProviderId.AWS, label: PROVIDER_LABEL[ProviderId.AWS] },
  { value: ProviderId.GCP, label: PROVIDER_LABEL[ProviderId.GCP] },
];

export const PROVIDER_ICONS: Record<ProviderId, ComponentType<SVGProps<SVGSVGElement>>> = {
  [ProviderId.AWS]: AwsIcon,
  [ProviderId.GCP]: GcpIcon,
};

export const PROVIDER_LINKS: Record<ProviderId, string> = {
  [ProviderId.AWS]: 's3://s3.[region].amazonaws.com/[bucket]',
  [ProviderId.GCP]: 's3://storage.googleapis.com/[bucket]',
};

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

export const AWS_REGIONS: SelectOption[] = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-east-2', label: 'US East (Ohio)' },
  { value: 'us-west-1', label: 'US West (N. California)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'af-south-1', label: 'Africa (Cape Town)' },
  { value: 'ap-east-1', label: 'Asia Pacific (Hong Kong)' },
  { value: 'ap-south-2', label: 'Asia Pacific (Hyderabad)' },
  { value: 'ap-southeast-3', label: 'Asia Pacific (Jakarta)' },
  { value: 'ap-southeast-5', label: 'Asia Pacific (Malaysia)' },
  { value: 'ap-southeast-4', label: 'Asia Pacific (Melbourne)' },
  { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)' },
  { value: 'ap-northeast-3', label: 'Asia Pacific (Osaka)' },
  { value: 'ap-northeast-2', label: 'Asia Pacific (Seoul)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
  { value: 'ap-southeast-7', label: 'Asia Pacific (Thailand)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
  { value: 'ca-central-1', label: 'Canada (Central)' },
  { value: 'ca-west-1', label: 'Canada West (Calgary)' },
  { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
  { value: 'eu-west-1', label: 'Europe (Ireland)' },
  { value: 'eu-west-2', label: 'Europe (London)' },
  { value: 'eu-south-1', label: 'Europe (Milan)' },
  { value: 'eu-west-3', label: 'Europe (Paris)' },
  { value: 'eu-south-2', label: 'Europe (Spain)' },
  { value: 'eu-north-1', label: 'Europe (Stockholm)' },
  { value: 'eu-central-2', label: 'Europe (Zurich)' },
  { value: 'il-central-1', label: 'Israel (Tel Aviv)' },
  { value: 'mx-central-1', label: 'Mexico (Central)' },
  { value: 'me-south-1', label: 'Middle East (Bahrain)' },
  { value: 'me-central-1', label: 'Middle East (UAE)' },
  { value: 'sa-east-1', label: 'South America (São Paulo)' },
];

export const AWS_REGION_VALUES = AWS_REGIONS.map((r) => r.value);
export type AwsRegion = (typeof AWS_REGION_VALUES)[number];

export type FieldName = 'provider' | 'bucket' | 'path' | 'region' | 'key' | 'secret';

export const FieldType = {
  TEXT: 'text',
  SECRET: 'secret',
  SELECT: 'select',
} as const;

export type FieldType = (typeof FieldType)[keyof typeof FieldType];

export type FieldConfig = {
  name: FieldName;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  colSpan?: 1 | 2;
};

const PROVIDER_FIELD: FieldConfig = {
  name: 'provider',
  label: 'Choose Provider',
  type: FieldType.SELECT,
  options: PROVIDER_OPTIONS,
  colSpan: 2,
};

/**
 * Adds a provider field to the beginning of a field configuration array.
 * @param fields - The field configuration array to augment with a provider field.
 * @returns A new field configuration array with the provider field prepended.
 * @throws {Error} If the fields array already contains a field named "provider".
 */
function withProvider(fields: FieldConfig[]): FieldConfig[] {
  if (fields.some((f) => f.name === 'provider')) {
    throw new Error('Do not include "provider" field manually; it is injected by withProvider().');
  }
  return [PROVIDER_FIELD, ...fields];
}

export const PROVIDER_FIELDS: Record<ProviderId, FieldConfig[]> = {
  aws: withProvider([
    { name: 'bucket', label: 'Bucket Name', type: FieldType.TEXT, colSpan: 1 },
    {
      name: 'region',
      label: 'Region Name',
      type: FieldType.SELECT,
      options: AWS_REGIONS,
      colSpan: 1,
    },
    {
      name: 'path',
      label: 'Path',
      type: FieldType.TEXT,
      placeholder: 'folder/output.mp4',
      colSpan: 2,
    },
    {
      name: 'key',
      label: 'Access Key ID',
      type: FieldType.TEXT,
      colSpan: 1,
    },
    {
      name: 'secret',
      label: 'Secret Access Key',
      type: FieldType.SECRET,
      colSpan: 1,
    },
  ]),
  gcp: withProvider([
    { name: 'bucket', label: 'Bucket Name', type: FieldType.TEXT, colSpan: 2 },
    {
      name: 'path',
      label: 'Path',
      type: FieldType.TEXT,
      placeholder: 'folder/output.mp4',
      colSpan: 2,
    },
    {
      name: 'key',
      label: 'Access Key ID',
      type: FieldType.TEXT,
      colSpan: 1,
    },
    {
      name: 'secret',
      label: 'Secret Access Key',
      type: FieldType.SECRET,
      colSpan: 1,
    },
  ]),
};
