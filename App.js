import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootStack from './src/configs/navigations';
import {theme} from './src/core/theme';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/configs/redux';

const Main = () => (
  <ReduxProvider store={store}>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  </ReduxProvider>
);

export default Main;
