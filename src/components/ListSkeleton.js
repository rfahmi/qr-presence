import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ListComponent = () => {
  return (
    <>
      <View style={styles.container}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            marginBottom={8}
            width={50}
            height={18}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item width={200} height={18} borderRadius={4} />
        </SkeletonPlaceholder>
      </View>
      <Divider />
    </>
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 8,
  },
});
