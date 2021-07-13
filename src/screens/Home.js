import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import List from '../components/List';
import Title from '../components/Title';
import TitleBar from '../components/TitleBar';
import {api} from '../configs/api';
import {theme} from '../core/theme';
import Content from '../organism/Content';
import {RNToasty} from 'react-native-toasty';
import AsyncStorage from '@react-native-community/async-storage';
import {IconButton} from 'react-native-paper';

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
      .get(`/user/${user._id}/presence?size=1`, {
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

  const keyExtractor = (item, index) => {
    return String(item._id);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <TitleBar />
      <ScrollView>
        {user && (
          <Title
            title={`Selamat Pagi, ${'\n'}${user.name}`}
            chip={user.division.name}
          />
        )}
        <View style={{paddingHorizontal: 16, marginBottom: 16}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 8}}>
            Hari Ini
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                padding: 16,
                backgroundColor: '#eee',
                borderRadius: 8,
                marginRight: 8,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 8}}>
                {data2 && data2.ratioMasuk}%
              </Text>
              <Text style={{fontSize: 10}}>Performa Kehadiran</Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                padding: 16,
                backgroundColor: '#eee',
                borderRadius: 8,
                marginRight: 8,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: 8}}>
                {data2 && data2.jumlahTelatMin} Min
              </Text>
              <Text style={{fontSize: 10}}>Total Telat</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                borderRadius: 8,
                marginRight: 8,
              }}>
              <IconButton
                icon="arrow-right"
                color="#333"
                size={20}
                style={{backgroundColor: '#eee'}}
                onPress={() => navigation.navigate('App', {screen: 'Report'})}
              />
              <Text style={{fontSize: 12}}>Semua</Text>
            </View>
          </View>
        </View>

        <Content
          title="Riwayat Kehadiran"
          titleAction={() => navigation.navigate('App', {screen: 'History'})}>
          <FlatList
            style={{paddingHorizontal: 8}}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => (
              <List
                title="Test"
                description={item.timestamp}
                icon="check-circle"
              />
            )}
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
