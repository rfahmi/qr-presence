import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Presence from '../../../screens/Presence';

const Stack = createStackNavigator();

const PresenceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Presence"
        component={Presence}
        options={{title: 'Camera'}}
      />
    </Stack.Navigator>
  );
};
export default PresenceStack;
