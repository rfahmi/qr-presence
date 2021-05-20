import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootStack from './src/configs/navigations';
import {theme} from './src/core/theme';

const Main = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  </PaperProvider>
);

export default Main;
