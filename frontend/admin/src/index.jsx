import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'core-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import store from './store';

// Create a Query Client
const queryClient = new QueryClient();

// Render the application
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
);
