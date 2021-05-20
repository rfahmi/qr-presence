import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import List from '../components/List';
import Title from '../components/Title';
import TitleBar from '../components/TitleBar';
import Content from '../organism/Content';

const History = ({navigation}) => {
  return (
    <View>
      <TitleBar />
      <ScrollView>
        <Title title={`Riwayat ${'\n'}Kehadiran`} />
        <Content
          title="Riwayat Kehadiran"
          titleAction={() => navigation.push('App', {screen: 'History'})}>
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
            onPress={() => navigation.push('Presence')}
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
          <List
            title="Basis Data"
            description="02 Juni 2021 17:00"
            icon="check-circle"
          />
        </Content>
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});
