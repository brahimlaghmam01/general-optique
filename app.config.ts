import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: "Générale d'Optique",
  slug: 'generale-optique-app',
  scheme: 'generale-optique',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.generaleoptique.app',
  },
  android: {
    package: 'com.generaleoptique.app',
  },
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-secure-store',
    'expo-splash-screen',
  ],
};

export default config;
