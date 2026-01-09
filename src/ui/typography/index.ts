import './styles.css';

type Type = 'body';

type TypographyOptions = {
  body: {
    size: 'small' | 'medium' | 'large';
    weight: 'light' | 'regular';
  };
};

/**
 * Generates typography configuration props with optional styling attributes.
 * 
 * @template T - The typography type, constrained to valid Type values.
 * @param type - The typography type (e.g., 'body', 'heading'). Defaults to 'body' if not provided.
 * @param size - The typography size. Must be valid for the specified type. Defaults to 'medium' if not provided.
 * @param weight - The optional font weight for the typography.
 * @returns An object containing data attributes for typography styling with keys like 'data-ui-typo', 'data-ui-typo-size', and optionally 'data-ui-typo-weight'.
 */
export function typography<T extends Type>(
  type?: T,
  size?: TypographyOptions[T]['size'],
  weight?: TypographyOptions[T]['weight']
): { [key: string]: string } {
  const internalType = type || 'body';
  const internalSize = size || 'medium';

  const props: { [key: string]: string } = {
    'data-ui-typo': internalType,
    'data-ui-typo-size': internalSize,
  };

  if (weight) {
    props['data-ui-typo-weight'] = weight;
  }

  return props;
}
