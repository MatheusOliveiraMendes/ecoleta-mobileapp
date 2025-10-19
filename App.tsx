import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/routes';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Expo recomenda ignorar erros de chamada múltipla aqui.
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular: require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    Roboto_500Medium: require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    Ubuntu_700Bold: require('./src/assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
  });

  useEffect(() => {
    if (fontError) {
      console.error(fontError);
    }
  }, [fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="dark" />
        <Routes />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
