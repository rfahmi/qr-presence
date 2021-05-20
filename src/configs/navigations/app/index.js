import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import Home from '../../../screens/Home';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};
export default AppStack;
