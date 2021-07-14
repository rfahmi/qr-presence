import moment from 'moment';
import 'moment/locale/id';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import List from '../components/List';
import ListSkeleton from '../components/ListSkeleton';
import Content from './Content';

const SummaryHistory = ({data, action}) => {
  const keyExtractor = (item, index) => {
    return String('SummaryHistory' + item._id);
  };
  return (
    <Content title="Riwayat Presensi" titleAction={action}>
      {data ? (
        <FlatList
          style={{paddingHorizontal: 8}}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => (
            <List
              title={
                <View>
                  <Text
                    style={{marginRight: 20, fontSize: 16, fontWeight: 'bold'}}>
                    {moment(item.timestamp).format('dddd')}
                  </Text>
                  {item.isLate && (
                    <View
                      style={{
                        backgroundColor: 'orange',
                        borderRadius: 2,
                      }}>
                      <Text
                        style={{
                          marginVertical: 2,
                          marginLeft: 4,
                          fontSize: 11,
                          color: 'white',
                        }}>
                        Telat
                      </Text>
                    </View>
                  )}
                </View>
              }
              description={moment(item.timestamp).format('LLL')}
              icon={
                item.type === 'in' ? 'arrow-down-circle' : 'arrow-up-circle'
              }
              isLate={item.isLate}
              iconColor={item.type === 'in' ? 'success' : 'error'}
              index={index}
            />
          )}
        />
      ) : (
        Array.from(Array(9)).map(() => <ListSkeleton />)
      )}
    </Content>
  );
};

export default SummaryHistory;
