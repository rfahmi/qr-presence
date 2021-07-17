import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, RefreshControl, View} from 'react-native';
import List from '../components/ListInfo';
import Title from '../components/Title';
import TitleBar from '../components/TitleBar';
import Content from '../organism/Content';
import AsyncStorage from '@react-native-community/async-storage';
import {theme} from '../core/theme';
import {api} from '../configs/api';
import {RNToasty} from 'react-native-toasty';
import ListSkeleton from '../components/ListSkeleton';
import {currency} from '../utils/number';
import moment from 'moment';

const Report = () => {
  const date = moment();
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
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
          year: date.format('YYYY'),
          month: date.format('M'),
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
    user && getSummary();
  }, [user, getSummary]);

  const onRefresh = async () => {
    setData(null);
    getSummary();
  };

  return (
    <View style={styles.container}>
      <TitleBar />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <Title title={`Laporan ${'\n'}Kehadiran`} />
        <Content title="Informasi Umum">
          {user && data ? (
            <>
              <List title="N.I.K" description={user.nik} />
              <List title="Nama" description={user.name} />
              <List title="Divisi" description={user.division.name} />
              <List
                title="Hari Kerja"
                description={`${data.jumlahMasuk} Hari`}
              />
              <List
                title="Jumlah Telat"
                description={`${data.jumlahTelat} Kali`}
              />
              <List
                title="Total Waktu Telat"
                description={`${data.jumlahTelatMin} Menit`}
              />
              <List title="Uang Makan" description={currency(data.uangMakan)} />
              <List
                title="Denda Telat"
                description={currency(data.dendaTelat)}
              />
            </>
          ) : (
            Array.from(Array(9)).map(() => <ListSkeleton />)
          )}
        </Content>
      </ScrollView>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
});
