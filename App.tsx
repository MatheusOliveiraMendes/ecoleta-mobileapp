import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto_400Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto_500Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Ubuntu_700Bold': require('./src/assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),

  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <Routes />
    </>
  );
}
