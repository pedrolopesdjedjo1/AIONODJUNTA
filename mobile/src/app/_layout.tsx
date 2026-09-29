
import { DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";

// Manter o ecrã de abertura do Expo até a aplicação estar pronta.
void SplashScreen.preventAutoHideAsync().catch(() => {
  // Evita erros caso o ecrã de abertura já tenha sido tratado.
});

export default function TabLayout() {
  useEffect(() => {
    // O componente AnimatedSplashOverlay mantém a animação existente.
    // O ecrã inicial da aplicação é apresentado pelo Expo Router.
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
