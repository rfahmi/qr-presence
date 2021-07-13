import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import DrawerContent from '../../../components/DrawerContent';
import History from '../../../screens/History';
import Home from '../../../screens/Home';
import Report from '../../../screens/Report';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerLabel: 'Utama'}}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{drawerLabel: 'Kehadiran'}}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{drawerLabel: 'Laporan Kehadiran'}}
      />
    </Drawer.Navigator>
  );
};
export default AppStack;
