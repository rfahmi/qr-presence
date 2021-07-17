import AsyncStorage from '@react-native-community/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Modalize} from 'react-native-modalize';
import {Button, Divider} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../components/Title';
import TitleBar from '../components/TitleBar';
import {api} from '../configs/api';
import {theme} from '../core/theme';
import Summary from '../organism/Summary';
import SummaryHistory from '../organism/SummaryHistory';

const Home = ({navigation}) => {
  const fpModal = useRef(null);
  const [authenticate, setAuthenticate] = useState(false);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [askFpAuth, setAskFpAuth] = useState(false);

  const createKey = () => {
    ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
      ({publicKey}) => {
        console.log('key created');
        enrollKey(publicKey);
        setAskFpAuth(false);
      },
    );
  };
  const getUser = () => {
    AsyncStorage.getItem('user_data').then(res => {
      const u = JSON.parse(res);
      setUser(u);
      AsyncStorage.getItem('fp_auth').then(res => {
        if (res === 'on') {
          ReactNativeBiometrics.isSensorAvailable().then(
            ({available, biometryType}) => {
              if (available) {
                console.log('sensor avail');
                fpModal.current?.open();
                //2. Check public key exist
                if (!ReactNativeBiometrics.biometricKeysExist) {
                  createKey();
                } else {
                  console.log('key creation skipped');
                }
                //3. Buat Signature
                ReactNativeBiometrics.createSignature({
                  promptMessage: 'Konfirmasi Sidik Jari',
                  payload: u._id,
                })
                  .then(({signature, success}) => {
                    if (success) {
                      verifySign(signature, u._id);
                    } else {
                      fpModal.current?.open();
                      BackHandler.exitApp();
                    }
                  })
                  .catch(e => console.log(e));
              }
            },
          );
        } else {
          setAskFpAuth(true);
          setAuthenticate(true);
          setAuthLoading(false);
        }
      });
    });
  };
  const getSummary = useCallback(async () => {
    console.log('get summary');
    const api_token = await AsyncStorage.getItem('api_token');
    setLoading(true);
    await api
      .post(
        `/user/${user._id}/presence/report/summary`,
        {
          year: 2021,
          month: 6,
        },
        {
          headers: {
            token: api_token,
          },
        },
      )
      .then(async res => {
        setLoading(false);
        console.log(res.data);
        if (res.data.success) {
          setData2(res.data.data);
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
  }, [user]);

  const enrollKey = async publicKey => {
    const api_token = await AsyncStorage.getItem('api_token');
    await api.put(
      `/user/${user._id}`,
      {
        publicKey,
      },
      {
        headers: {
          token: api_token,
        },
      },
    );
  };
  const verifySign = async (signature, user_id) => {
    setAuthLoading(true);
    const api_token = await AsyncStorage.getItem('api_token');
    await api
      .post(
        `/user/${user_id}/verifysign`,
        {
          signature,
        },
        {
          headers: {
            token: api_token,
          },
        },
      )
      .then(res => {
        setAuthLoading(false);
        if (res.data.success) {
          setAuthenticate(true);
          fpModal.current?.close();
        } else {
          setAuthenticate(false);
        }
      })
      .catch(e => {
        setAuthLoading(false);
        console.log(e);
      });
  };

  const getPresence = useCallback(async () => {
    console.log('get presence');
    const api_token = await AsyncStorage.getItem('api_token');
    setLoading(true);
    await api
      .get(`/user/${user._id}/presence?size=10`, {
        headers: {
          token: api_token,
        },
      })
      .then(async res => {
        setLoading(false);
        if (res.data.success) {
          setData(res.data.data);
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
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    user && authenticate && getPresence() && getSummary();
  }, [user, getPresence, getSummary, authenticate]);

  const onRefresh = async () => {
    setData(null);
    setData2(null);
    getPresence();
    getSummary();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <TitleBar />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {user && (
          <Title title={`Hai, ${user.name}!`} chip={user.division.name} />
        )}
        {askFpAuth && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'orange',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="alert-circle" size={24} color="#fff" />
              <Text style={{color: '#fff', marginLeft: 6, fontSize: 14}}>
                Tips: Aktifkan sidik jari
              </Text>
            </View>
            <Button
              mode="contained"
              color="white"
              labelStyle={{color: 'orange'}}
              onPress={() => {
                createKey();
                AsyncStorage.setItem('fp_auth', 'on');
              }}>
              Aktifkan
            </Button>
          </View>
        )}
        <Divider />
        <Summary
          data={data2}
          action={() => navigation.navigate('App', {screen: 'Report'})}
        />
        <SummaryHistory
          data={data}
          action={() => navigation.navigate('App', {screen: 'History'})}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}>
          <Text style={{color: '#888', fontSize: 12, marginBottom: 2}}>
            Hanya 10 data terakhir
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('App', {screen: 'History'})}>
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              Lihat Semua Data
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modalize
        ref={fpModal}
        onBackButtonPress={() => BackHandler.exitApp()}
        alwaysOpen={undefined}
        modalStyle={styles.modal}
        modalHeight={250}
        closeOnOverlayTap={false}>
        <View style={styles.fingerprint}>
          {authLoading ? (
            <ActivityIndicator size={100} color={theme.colors.grayLight} />
          ) : (
            <Icon
              name="fingerprint"
              size={130}
              color={theme.colors.grayLight}
            />
          )}
        </View>
        <View style={styles.fingerprintCaption}>
          {authLoading ? (
            <Text>Verifikasi identitas</Text>
          ) : (
            <Text>Letakkan jari anda pada sensor</Text>
          )}
        </View>
      </Modalize>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  fingerprint: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerprintCaption: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modal: {flex: 1, zIndex: 9, padding: 16},
});
