import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {theme} from '../core/theme';

const ContentTitle = ({title}) => {
  const navigation = useNavigation();

  const _toggleDrawer = () => navigation.toggleDrawer();

  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Content title={title} titleStyle={styles.text} />
      <Appbar.Action
        icon="arrow-right"
        color={theme.colors.grayMedium}
        onPress={_toggleDrawer}
      />
    </Appbar.Header>
  );
};

export default ContentTitle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  text: {color: theme.colors.grayMedium, fontSize: 16, fontWeight: 'bold'},
});
