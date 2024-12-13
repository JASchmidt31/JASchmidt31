import React from 'react';
import { AppStore } from '../src/store/AppStore';
import CustomStack from '../src/ui/CustomStack';

export default function RootLayout() {
  return (
    <AppStore>
      <CustomStack />
    </AppStore>
  );
}
