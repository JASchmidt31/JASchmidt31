import { Stack } from 'expo-router';
import React from 'react';
import { AppStore } from '../src/store/AppStore';

export default function RootLayout() {
  return (
    <AppStore>
      <Stack />
    </AppStore>
  );
}
