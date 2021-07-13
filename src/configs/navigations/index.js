import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '../../screens/Auth';
import Splash from '../../screens/Splash';
import {isLogin} from '../../utils/auth';
import {setAuth} from '../redux/action/authActions';
import AppStack from './app';
import PresenceStack from './presence';

const Stack = createStackNavigator();

const RootStack = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    isLogin().then(e => {
      e && dispatch(setAuth(true));
    });
    setTimeout(() => setLoading(false), 600);
  }, [dispatch]);

  return (
    <Stack.Navigator headerMode="none">
      {loading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : auth.isLogin ? (
        <>
          <Stack.Screen name="App" component={AppStack} />
          <Stack.Screen name="Presence" component={PresenceStack} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
