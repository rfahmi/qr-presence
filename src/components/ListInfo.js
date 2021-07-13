import React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {theme} from '../core/theme';

const ListInfo = ({title, description, icon, onPress}) => {
  return (
    <List.Item
      onPress={onPress}
      title={title}
      titleStyle={styles.titleStyle}
      description={description}
      style={styles.list}
      right={() => <List.Icon icon={icon} color={theme.colors.success} />}
    />
  );
};

export default ListInfo;

const styles = StyleSheet.create({
  list: {},
  titleStyle: {
    fontWeight: 'bold',
    color: theme.colors.grayDark,
  },
});
