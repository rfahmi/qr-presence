import AsyncStorage from '@react-native-community/async-storage';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption, Drawer, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {setAuth} from '../configs/redux/action/authActions';

const DrawerContent = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user_data')));
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <TouchableRipple onPress={() => props.navigation.navigate('Report')}>
          <View style={styles.userInfoSection}>
            <Text style={styles.title}>{user && user.name.toUpperCase()}</Text>
            <Caption style={styles.caption}>
              {user && user.division.name}
            </Caption>
          </View>
        </TouchableRipple>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="circle" color={color} size={size} />
            )}
            label="Utama"
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="triangle" color={color} size={size} />
            )}
            label="Kehadiran"
            onPress={() => props.navigation.navigate('History')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="square" color={color} size={size} />
            )}
            label="Laporan"
            onPress={() => props.navigation.navigate('Report')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
            label="Logout"
            onPress={() => {
              AsyncStorage.removeItem('fp_auth');
              dispatch(setAuth(false));
              props.navigation.navigate('Auth');
              AsyncStorage.removeItem('api_token');
              AsyncStorage.removeItem('user_data');
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
