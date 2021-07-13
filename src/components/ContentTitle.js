import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {theme} from '../core/theme';

const ContentTitle = ({title, titleAction}) => {
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Content title={title} titleStyle={styles.text} />
      {titleAction && (
        <Appbar.Action
          icon="arrow-right"
          color={theme.colors.grayMedium}
          onPress={titleAction}
        />
      )}
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
