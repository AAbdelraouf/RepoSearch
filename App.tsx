/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'jotai';
import {MainNavigator} from './src/navigation/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <Provider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <MenuProvider>
            <MainNavigator />
          </MenuProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
