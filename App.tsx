// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/routes/Routes';
import { getToastConfig } from './src/components/Toast/Toast';
import { Toast } from 'react-native-toast-message/lib/src/Toast';




export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
      <Toast config={getToastConfig()} />
    </NavigationContainer>
  );
}