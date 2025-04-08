// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import {AuthProvider} from './src/context/AuthContext';
import {persistor, store} from './src/redux/store/store';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
              <AppNavigation />
              <Toast />
            </SafeAreaView>
          </SafeAreaProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
