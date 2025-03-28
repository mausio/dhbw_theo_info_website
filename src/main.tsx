import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/general/global.style.ts';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
