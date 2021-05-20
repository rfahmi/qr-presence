import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../core/theme';

const TitleBar = ({title, subtitle}) => {
  const navigation = useNavigation();
  const _toggleDrawer = () => navigation.toggleDrawer();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon="menu"
        color={theme.colors.grayMedium}
        onPress={_toggleDrawer}
      />
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  header: {backgroundColor: theme.colors.surface, elevation: 0},
});
