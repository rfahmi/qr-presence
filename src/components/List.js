import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {theme} from '../core/theme';

const ListComponent = ({title, description, icon, onPress, index = 0}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          top: '40%',
          left: 16,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.primary,
            borderWidth: 2,
            width: 16,
            height: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor:
                index === 0 ? theme.colors.primary : 'transparent',
              width: 8,
              height: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View
          style={{
            width: 2,
            height: 80,
            backgroundColor: theme.colors.primary,
          }}
        />
      </View>
      <List.Item
        onPress={onPress}
        title={title}
        titleStyle={styles.titleStyle}
        description={description}
        style={styles.list}
        right={() => <List.Icon icon={icon} color={theme.colors.success} />}
      />
    </View>
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: theme.colors.grayLight,
    marginLeft: 40,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: theme.colors.grayDark,
  },
});
