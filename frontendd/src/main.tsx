import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// BURASI KRİTİK: @pages yerine direkt ./pages/app/App yazıyoruz
import App from './pages/app/App'; 

import client from './config/yeni-client';
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
