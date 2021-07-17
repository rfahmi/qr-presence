import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Logo from '../components/Logo';
import {theme} from '../core/theme';

const Splash = ({navigation}) => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Logo />
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <Text style={{color: theme.colors.gray, fontSize: 12}}>
            Versi 1.2
          </Text>
          <Text style={{color: theme.colors.gray, fontSize: 12}}>
            {'\u00A9'} Fahmi Rizalul
          </Text>
        </View>
      </View>
    </>
  );
};

export default Splash;
