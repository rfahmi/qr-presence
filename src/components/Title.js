import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {theme} from '../core/theme';

const Title = ({title, chip}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {chip && <Chip style={styles.chip}>{chip}</Chip>}
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surface,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {color: theme.colors.primary, fontSize: 32, fontWeight: 'bold'},
  chip: {
    marginVertical: 8,
  },
});
