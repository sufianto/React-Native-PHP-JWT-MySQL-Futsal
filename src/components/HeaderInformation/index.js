import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {IconDefaultUser, IconJadwal, IconStadion} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProfile } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'http://192.168.56.1/backendreactnative/React_native_futsal';

const HeaderInformation = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const profileData = await fetchProfile(token);
          if (profileData && !profileData.error) {
            setUserData(profileData);
          }
        }
      } catch (error) {
        console.error('Error mengambil data profil:', error);
      }
    };

    getUserData();
  }, []);

  const handleJadwalPress = () => {
    navigation.navigate('Jadwal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={
            userData && userData.foto
              ? { uri: `${BASE_URL}/${userData.foto}` }
              : require('../../assets/logos/bogor.png')
          }
          style={styles.profileImage}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.hello}>Hello Bro, </Text>
          <Text style={styles.username}>{userData ? userData.username : 'User'}</Text>
        </View>
      </View>
      <View style={styles.jadwalInfo}>
        <View>
          <Text style={styles.jam}>19.00 WIB, </Text>
          <Text style={styles.tanggal}>Sabtu, 01-08-2020</Text>
        </View>
        <TouchableOpacity style={styles.iconJadwal} onPress={handleJadwalPress}>
          <IconStadion />
          <Text style={styles.labelNext}>Next Jadwal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderInformation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 5,
  },
  textWrapper: {
    marginLeft: 5,
    marginTop: 5,
  },
  hello: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  username: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  jam: {
    textAlign: 'right',
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
    marginTop: 5,
  },
  tanggal: {
    textAlign: 'right',
    fontSize: 11,
    fontFamily: 'Poppins-Light',
  },
  jadwalInfo: {
    flexDirection: 'row',
  },
  iconJadwal: {
    alignItems: 'center',
  },
  labelNext: {
    fontSize: 11,
    fontFamily: 'Poppins-Light',
  },
});
