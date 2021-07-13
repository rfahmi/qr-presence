import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    marginBottom: 12,
    resizeMode: 'contain',
  },
});

export default memo(Logo);
