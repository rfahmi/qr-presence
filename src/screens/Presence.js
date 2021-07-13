// import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
// import RNBeep from 'react-native-a-beep';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {Modalize} from 'react-native-modalize';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../core/theme';
import Biometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-community/async-storage';
import {api} from '../configs/api';
import {RNToasty} from 'react-native-toasty';
import RNBeep from 'react-native-a-beep';

const Presence = ({navigation, route}) => {
  // const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const {type, method} = route.params;
  navigation.setOptions({title: method === 'qr' ? 'QR Scan' : 'Photo Selfie'});
  const fpModal = useRef(null);
  const cameraRef = useRef(null);
  const [authenticate, setAuthenticate] = useState(true);

  const onBarCodeRead = scanResult => {
    RNBeep.beep();
    createPresence(scanResult.data);
    return;
  };
  const onCapture = async () => {
    if (cameraRef) {
      const options = {quality: 0.3, base64: true};
      const data = await cameraRef.current?.takePictureAsync(options);
      createPresence(data.uri);
    }
    return;
  };
  const createPresence = async payload => {
    const api_token = await AsyncStorage.getItem('api_token');
    const user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
    setLoading(true);
    const body = new FormData();
    method === 'photo'
      ? body.append('photo', {
          uri: payload,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      : body.append('qr', payload);
    api
      .post(`/user/${user_data._id}/presence/${type}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data;',
          token: api_token,
        },
      })
      .then(async res => {
        setLoading(false);
        console.log(res.data);
        if (res.data.success) {
          navigation.goBack();
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
        console.log(err);
        setLoading(false);
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  };

  useEffect(() => {
    // Biometrics.isSensorAvailable().then(biometryType => {
    //   fpModal.current?.open();
    //   Biometrics.simplePrompt('Confirm fingerprint')
    //     .then(() => {
    //       console.log('successful fingerprint provided');
    //       setAuthenticate(true);
    //       fpModal.current?.close();
    //     })
    //     .catch(() => {
    //       console.log('fingerprint failed or prompt was cancelled');
    //     });
    // });
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.upperSection}>
        {authenticate ? (
          <RNCamera
            ref={cameraRef}
            onBarCodeRead={method === 'qr' ? onBarCodeRead : null}
            type={method === 'qr' ? 'back' : 'front'}
            style={styles.preview}>
            {method === 'qr' && (
              <BarcodeMask
                width={300}
                height={300}
                showAnimatedLine={true}
                outerMaskOpacity={0.5}
              />
            )}
            {method === 'photo' && (
              <View
                style={{
                  padding: 16,
                  position: 'absolute',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => onCapture()}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                      backgroundColor: '#fff',
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </RNCamera>
        ) : (
          <View style={styles.preview} />
        )}
      </View>
      {/* <Modalize
        ref={fpModal}
        onClose={() => !authenticate && navigation.goBack()}
        modalStyle={styles.modal}
        modalHeight={300}>
        <Title>Konfirmasi Kepemilikan Device</Title>
        <View style={styles.fingerprint}>
          <Icon name="fingerprint" size={150} color={theme.colors.grayLight} />
        </View>
      </Modalize> */}
    </View>
  );
};

const styles = {
  root: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  upperSection: {
    flex: 1,
  },
  modal: {flex: 1, zIndex: 9, padding: 16},
  fingerprint: {
    aspectRatio: 3 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Presence;
