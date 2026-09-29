
/**
 * Tema visual oficial do AIONÔDJUNTA Mobile.
 *
 * Identidade:
 * Verde financeiro, branco, preto e tons suaves de verde.
 * O projeto AIONÔDJUNTA é independente do projeto NÔDJUNTA.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    // Texto
    text: "#14251F",
    textSecondary: "#6B7C74",

    // Fundos
    background: "#F5F8F6",
    backgroundElement: "#FFFFFF",
    backgroundSelected: "#D9F2E5",

    // Identidade AIONÔDJUNTA
    primary: "#087A55",
    primaryDark: "#075B40",
    accent: "#D9F2E5",
    accentStrong: "#8DE0B5",

    // Elementos comuns
    border: "#E2EAE5",
    white: "#FFFFFF",
    black: "#000000",

    // Compatibilidade com os componentes existentes
    tint: "#087A55",
    icon: "#6B7C74",
    tabIconDefault: "#6B7C74",
    tabIconSelected: "#087A55",
  },

  dark: {
    // Texto
    text: "#F3F7F4",
    textSecondary: "#A6B5AD",

    // Fundos
    background: "#101A15",
    backgroundElement: "#1B2921",
    backgroundSelected: "#244B38",

    // Identidade AIONÔDJUNTA
    primary: "#36B887",
    primaryDark: "#8DE0B5",
    accent: "#244B38",
    accentStrong: "#36B887",

    // Elementos comuns
    border: "#304238",
    white: "#FFFFFF",
    black: "#000000",

    // Compatibilidade com os componentes existentes
    tint: "#36B887",
    icon: "#A6B5AD",
    tabIconDefault: "#A6B5AD",
    tabIconSelected: "#36B887",
  },
} as const;

export type ThemeColor =
  | (keyof typeof Colors.light & keyof typeof Colors.dark);

export const Fonts = Platform.select({
  ios: {
    /** iOS system sans-serif */
    sans: "system-ui",
    /** iOS system serif */
    serif: "ui-serif",
    /** iOS rounded font */
    rounded: "ui-rounded",
    /** iOS monospaced font */
    mono: "ui-monospace",
  },

  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },

  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
