import React from 'react';
import {StyleSheet, View} from 'react-native';
import ContentTitle from '../components/ContentTitle';
import {theme} from '../core/theme';

const Content = props => {
  return (
    <View style={styles.container}>
      <ContentTitle title={props.title} />
      <View>{props.children}</View>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
  },
});
