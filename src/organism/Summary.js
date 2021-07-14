import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Summary = ({data, action}) => {
  return (
    <View style={{paddingHorizontal: 16, marginVertical: 16}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: 8,
          color: '#333',
        }}>
        Hari Ini
      </Text>
      <View style={styles.container}>
        <View style={styles.card}>
          {data ? (
            <Text style={styles.primaryText}>{data.ratioMasuk}%</Text>
          ) : (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                marginBottom={8}
                width={80}
                height={30}
                borderRadius={4}
              />
            </SkeletonPlaceholder>
          )}
          <Text style={{fontSize: 10}}>Performa Kehadiran</Text>
        </View>
        <View style={styles.card}>
          {data ? (
            <Text style={styles.primaryText}>{data.jumlahTelatMin} Min</Text>
          ) : (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                marginBottom={8}
                width={80}
                height={30}
                borderRadius={4}
              />
            </SkeletonPlaceholder>
          )}
          <Text style={{fontSize: 10}}>Total Telat</Text>
        </View>

        <View style={styles.card2}>
          <IconButton
            icon="arrow-right"
            color="#333"
            size={20}
            style={{backgroundColor: '#eee'}}
            onPress={action}
          />
          <Text style={{fontSize: 12}}>Semua</Text>
        </View>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  card: {
    flex: 2,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 8,
  },
  card2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
    color: '#333',
  },
});
