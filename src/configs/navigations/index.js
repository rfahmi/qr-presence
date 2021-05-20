import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import Auth from '../../screens/Auth';
import AppStack from './app';
// import Splash from '../../screens/splash';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      {/* {Platform.OS === 'android' && (
        <Stack.Screen name="Splash" component={Splash} />
      )} */}
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
