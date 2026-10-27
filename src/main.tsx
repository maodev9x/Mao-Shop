import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MotionConfig reducedMotion="user">
        <ShopProvider>
          <App />
        </ShopProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
