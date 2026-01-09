import { typography } from '@/ui';

import styles from './styles.module.css';

type Props = {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export const StorageContainer = ({ title, children, footer }: Props) => (
  <div className={styles.container}>
    <h5 {...typography('body', 'large')}>{title}</h5>
    <div className={styles.body}>{children}</div>
    <div className={styles.footer}>{footer}</div>
  </div>
);
