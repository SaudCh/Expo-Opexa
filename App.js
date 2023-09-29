import 'react-native-gesture-handler';
import i18n from './language/i18next';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import axios from './config/axios';
import { LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useEffect } from 'react';
import AppNavigation from './navigations/AppNavigation';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from './constants/colors';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from './context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import ToastProvider from './provider/toastProvider';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



WebBrowser.maybeCompleteAuthSession();

export default function App() {


  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  const MyTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      accent: '#03dac4',
      background: '#f6f6f6',
      surface: '#ffffff',
      text: '#000000',
      error: '#b00020',
    },
  };

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK}
    >
      <ActionSheetProvider>
        <PaperProvider
          theme={MyTheme}
        >
          <RootSiblingParent>
            <NavigationContainer>
              <AuthProvider>
                <ToastProvider>
                  <AppNavigation />
                </ToastProvider>
              </AuthProvider>
            </NavigationContainer>
          </RootSiblingParent>
        </PaperProvider >
      </ActionSheetProvider>
    </StripeProvider>

  );
}

