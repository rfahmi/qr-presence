import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import List from '../components/List';
import Title from '../components/Title';
import TitleBar from '../components/TitleBar';
import {theme} from '../core/theme';
import Content from '../organism/Content';

const Home = () => {
  return (
    <View style={styles.container}>
      <TitleBar />
      <ScrollView>
        <Title title={`Selamat Pagi, ${'\n'}Fahmi`} />
        <Content title="Riwayat Kehadiran">
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
});
