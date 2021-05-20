import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';

const Auth = ({navigation}) => {
  const [nim, setNim] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.image}>
          <Logo />
          <Text style={styles.title}>Presensi QR</Text>
          <Text style={styles.subtitle}>Universitas Nusa Mandiri</Text>
        </View>
        <View style={styles.forms}>
          <TextInput
            label="NIM"
            returnKeyType="next"
            value={nim.value}
            onChangeText={text => setNim({value: text, error: ''})}
            error={!!nim.error}
            errorText={nim.error}
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
          contentStyle={styles.buttonContent}
          onPress={() => navigation.navigate('App')}>
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
