import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import RNBeep from 'react-native-a-beep';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {RNToasty} from 'react-native-toasty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {api} from '../configs/api';
import {theme} from '../core/theme';

const Presence = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const {type, method} = route.params;
  navigation.setOptions({title: method === 'qr' ? 'QR Scan' : 'Photo Selfie'});
  const cameraRef = useRef(null);

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
        navigation.goBack();
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

  return (
    <View style={styles.root}>
      <View style={styles.upperSection}>
        <RNCamera
          ref={cameraRef}
          onBarCodeRead={
            isFocused ? (method === 'qr' ? onBarCodeRead : null) : null
          }
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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {loading ? (
                    <ActivityIndicator color={theme.colors.primary} size={48} />
                  ) : (
                    <Icon
                      name="circle"
                      color={theme.colors.primary}
                      size={48}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </RNCamera>
      </View>
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
};

export default Presence;
