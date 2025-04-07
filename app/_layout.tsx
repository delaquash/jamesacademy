import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import {
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
// import { withIAPContext } from "react-native-iap";
// import { NotificationProvider } from "@/context/notification.provider";
import { LogBox } from "react-native";
// React Query Imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();


// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

// Create an async storage persister
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});


function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <PersistQueryClientProvider
  client={queryClient}
  persistOptions={{ 
    persister: asyncStoragePersister,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => {
        const persistableQueryKeys = ['userData', 'userProfile'];
        return persistableQueryKeys.includes(query.queryKey[0] as string);
      }
    }
  }}
>
    <ThemeProvider>
      {/* <NotificationProvider> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="/(routes)/onboarding/index" />
          <Stack.Screen name="(routes)/course-access" />
          <Stack.Screen name="(routes)/notification/index" />
        </Stack>
      {/* </NotificationProvider> */}
    </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

export default RootLayout;