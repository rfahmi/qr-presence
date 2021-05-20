import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {theme} from '../core/theme';

const Title = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Chip style={styles.chip}>Mahasiswa</Chip>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surface,
    padding: 16,
    aspectRatio: 2 / 1,
  },
  title: {color: theme.colors.primary, fontSize: 32, fontWeight: 'bold'},
  chip: {
    marginVertical: 8,
  },
});
