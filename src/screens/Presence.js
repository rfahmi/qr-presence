// import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import RNBeep from 'react-native-a-beep';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {Modalize} from 'react-native-modalize';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Presence = ({navigation}) => {
  // const isFocused = useIsFocused();
  const fpModal = useRef(null);
  const [authenticate, setAuthenticate] = useState(false);

  const onBarCodeRead = scanResult => {
    RNBeep.beep();
    // navigation.goBack();
    // action(scanResult.data);
    return;
  };

  useEffect(() => {
    fpModal.current?.open();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.upperSection}>
        {authenticate ? (
          <RNCamera
            // onBarCodeRead={isFocused ? onBarCodeRead : null}
            style={styles.preview}>
            <BarcodeMask
              width={300}
              height={300}
              showAnimatedLine={true}
              outerMaskOpacity={0.5}
            />
          </RNCamera>
        ) : (
          <View style={styles.preview} />
        )}
      </View>
      <Modalize
        ref={fpModal}
        // onClose={() => navigation.goBack()}
        modalStyle={styles.modal}
        modalHeight={300}>
        <Title>Konfirmasi Kepemilikan Device</Title>
        <View style={styles.fingerprint}>
          <Icon name="fingerprint" size={150} />
        </View>
      </Modalize>
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
