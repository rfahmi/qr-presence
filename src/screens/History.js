import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import List from '../components/List';
import TitleBar from '../components/TitleBar';
import {theme} from '../core/theme';
import Content from '../organism/Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {api} from '../configs/api';
import {RNToasty} from 'react-native-toasty';
import {Modalize} from 'react-native-modalize';
import {Title} from 'react-native-paper';
import ListSkeleton from '../components/ListSkeleton';
import moment from 'moment';
import 'moment/locale/id';

const History = ({navigation}) => {
  const [actionType, setActionType] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const modal = useRef(null);

  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user_data')));
  };

  const getPresence = useCallback(
    async p => {
      console.log('page', p);
      const api_token = await AsyncStorage.getItem('api_token');
      api
        .get(`/user/${user._id}/presence?page=${p}&size=${limit}`, {
          headers: {
            token: api_token,
          },
        })
        .then(async res => {
          if (res.data.success) {
            if (p > 1) {
              setData([...data, ...res.data.data]);
            } else {
              setData(res.data.data);
            }
            if (res.data.data.length < limit) {
              setHasMore(false);
            }
            setPage(p + 1);
            return true;
          } else {
            RNToasty.Error({
              title: res.data.message,
              position: 'bottom',
            });
          }
        })
        .catch(err => {
          RNToasty.Error({
            title: err.message,
            position: 'center',
          });
        });
    },
    [user],
  );

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    user &&
      getPresence(page)
        .then(() => {
          setLoading(false);
        })
        .catch(() => setLoading(false));
  }, [user, getPresence]);

  const keyExtractor = (item, index) => {
    return String(item._id);
  };

  const onRefresh = async () => {
    setData(null);
    setLoading(true);
    setPage(1);
    getPresence(1)
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const onLoadMore = () => {
    getPresence(page)
      .then(() => {
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <TitleBar title="Kehadiran" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <View
          key="presence_button"
          style={{paddingHorizontal: 16, marginBottom: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => {
                setActionType('in');
                modal.current?.open();
              }}
              style={[styles.button, {backgroundColor: theme.colors.success}]}>
              <Icon name="arrow-down" style={styles.buttonIcon} />
              <Text style={styles.buttonLabel}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActionType('out');
                modal.current?.open();
              }}
              style={[styles.button, {backgroundColor: theme.colors.error}]}>
              <Icon name="arrow-up" style={styles.buttonIcon} />
              <Text style={styles.buttonLabel}>Pulang</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Content key="presence_content" title="Timeline">
          {data ? (
            <FlatList
              style={{paddingHorizontal: 8}}
              data={data}
              keyExtractor={keyExtractor}
              onEndReached={onLoadMore}
              onEndThreshold={0.3}
              ListFooterComponent={
                hasMore && loading ? <ListSkeleton /> : <View />
              }
              removeClippedSubviews
              initialNumToRender={limit}
              maxToRenderPerBatch={limit}
              renderItem={({item, index}) => (
                <List
                  title={
                    <View>
                      <Text
                        style={{
                          marginRight: 20,
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
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
                  description={moment(item.timestamp).format(
                    'D-MMMM-y / HH:mm:ss',
                  )}
                  icon={
                    item.type === 'in' ? 'arrow-down-circle' : 'arrow-up-circle'
                  }
                  iconColor={item.type === 'in' ? 'success' : 'error'}
                  index={index}
                />
              )}
            />
          ) : (
            Array.from(Array(9)).map(() => <ListSkeleton />)
          )}
        </Content>
      </ScrollView>
      <Modalize ref={modal} modalStyle={styles.modal} modalHeight={180}>
        <Title>Pilih Metode</Title>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Presence', {
                screen: 'Presence',
                params: {type: actionType, method: 'photo'},
              })
            }
            style={styles.option}>
            <Icon name="camera" size={48} color={theme.colors.grayMedium} />
            <Text>Selfie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Presence', {
                screen: 'Presence',
                params: {type: actionType, method: 'qr'},
              })
            }
            style={styles.option}>
            <Icon name="qrcode" size={48} color={theme.colors.grayMedium} />
            <Text>QR Scan</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  modal: {flex: 1, zIndex: 9, padding: 16},
  buttonIcon: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 48,
    marginBottom: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
