import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { StrictMode } from 'react';
import { AppStore } from '../src/store/AppStore';
import CustomStack from '../src/ui/CustomStack';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <AppStore>
          <CustomStack />
        </AppStore>
      </StrictMode>
    </QueryClientProvider>
  );
}
