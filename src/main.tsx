import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ProviderWizard } from './components/provider-wizard.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderWizard />
  </StrictMode>
);
