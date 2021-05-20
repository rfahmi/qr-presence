import React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {theme} from '../core/theme';

const ListComponent = ({title, description, icon}) => {
  return (
    <List.Item
      title={title}
      titleStyle={styles.titleStyle}
      description={description}
      style={styles.list}
      right={() => <List.Icon icon={icon} color={theme.colors.success} />}
    />
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  list: {
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: theme.colors.grayLight,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: theme.colors.grayDark,
  },
});
