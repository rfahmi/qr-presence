import AsyncStorage from '@react-native-community/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {RNToasty} from 'react-native-toasty';
import Title from '../components/Title';
import TitleBar from '../components/TitleBar';
import {api} from '../configs/api';
import {theme} from '../core/theme';
import Summary from '../organism/Summary';
import SummaryHistory from '../organism/SummaryHistory';

const Home = ({navigation}) => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user_data')));
  };
  const getSummary = useCallback(async () => {
    const api_token = await AsyncStorage.getItem('api_token');
    setLoading(true);
    api
      .post(
        `/user/${user._id}/presence/report/summary`,
        {
          year: 2021,
          month: 6,
        },
        {
          headers: {
            token: api_token,
          },
        },
      )
      .then(async res => {
        setLoading(false);
        console.log(res.data);
        if (res.data.success) {
          setData2(res.data.data);
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
      })
      .catch(err => {
        setLoading(false);
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  }, [user]);

  const getPresence = useCallback(async () => {
    const api_token = await AsyncStorage.getItem('api_token');
    setLoading(true);
    api
      .get(`/user/${user._id}/presence?size=7`, {
        headers: {
          token: api_token,
        },
      })
      .then(async res => {
        setLoading(false);
        if (res.data.success) {
          setData(res.data.data);
        } else {
          RNToasty.Error({
            title: res.data.message,
            position: 'bottom',
          });
        }
      })
      .catch(err => {
        setLoading(false);
        RNToasty.Error({
          title: err.message,
          position: 'center',
        });
      });
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    user && getPresence() && getSummary();
  }, [user, getPresence, getSummary]);

  const onRefresh = async () => {
    setData(null);
    setData2(null);
    getPresence();
    getSummary();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <TitleBar />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {user && (
          <Title
            title={`Selamat Pagi, ${'\n'}${user.name}`}
            chip={user.division.name}
          />
        )}
        <Divider />
        <Summary
          data={data2}
          action={() => navigation.navigate('App', {screen: 'Report'})}
        />
        <SummaryHistory
          data={data}
          action={() => navigation.navigate('App', {screen: 'History'})}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}>
          <Text style={{color: '#888', fontSize: 12}}>
            Hanya 10 data tersedia
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('App', {screen: 'History'})}>
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              Lihat Semua Data
            </Text>
          </TouchableOpacity>
        </View>
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
