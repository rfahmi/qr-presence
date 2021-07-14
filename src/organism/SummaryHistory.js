import React from 'react';
import {FlatList} from 'react-native';
import List from '../components/List';
import ListSkeleton from '../components/ListSkeleton';
import Content from './Content';

const SummaryHistory = ({data, action}) => {
  const keyExtractor = (item, index) => {
    return String(item._id);
  };
  return (
    <Content title="Riwayat Kehadiran" titleAction={action}>
      {data ? (
        <FlatList
          style={{paddingHorizontal: 8}}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => (
            <List
              title="Test"
              description={item.timestamp}
              icon="check-circle"
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
