import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@pages/app/App';

// Eğer klasör src içindeyse bu çalışır:
import client from './config/apollo-client'; 

import { ApolloProvider } from '@apollo/client';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
