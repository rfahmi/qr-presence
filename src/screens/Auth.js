import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {api} from '../configs/api';
import AsyncStorage from '@react-native-community/async-storage';
import {RNToasty} from 'react-native-toasty';
import {useDispatch} from 'react-redux';
import {setAuth} from '../configs/redux/action/authActions';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const [nik, setNik] = useState({value: '111', error: ''});
  const [password, setPassword] = useState({value: 'test', error: ''});
  const [loading, setLoading] = useState(false);

  const _onLoginPressed = () => {
    setLoading(true);
    api
      .post('/user/login', {nik: nik.value, password: password.value})
      .then(async res => {
        console.log(res.data);
        setLoading(false);
        if (res.data.success) {
          navigation.navigate('App', {screen: 'Home'});
          dispatch(setAuth(true));
          AsyncStorage.setItem('api_token', res.headers.token);
          AsyncStorage.setItem('user_data', JSON.stringify(res.data.data));
          RNToasty.Success({
            title: res.data.message,
            position: 'bottom',
          });
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
      })
      .catch(err => {
        setLoading(false);
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.image}>
          <Logo />
          <Text style={styles.subtitle}>QR Presence</Text>
        </View>
        <View style={styles.forms}>
          <TextInput
            label="NIM"
            returnKeyType="next"
            value={nik.value}
            onChangeText={text => setNik({value: text, error: ''})}
            error={!!nik.error}
            errorText={nik.error}
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
        </View>
        <Button
          style={styles.buttonStyle}
          mode="contained"
          loading={loading}
          contentStyle={styles.buttonContent}
          onPress={() => _onLoginPressed()}>
          MASUK
        </Button>
      </View>
    </>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  image: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 18,
  },
  forms: {
    flex: 4,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 0,
  },
  buttonContent: {
    height: '100%',
  },
  buttonLabel: {
    fontWeight: 'bold',
    height: '100%',
  },
});
