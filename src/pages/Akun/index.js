import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {fetchProfile} from '../../services/api';
import {AuthContext} from '../../context/AuthContext';

const Akun = ({navigation, route}) => {
  const {user, setUser} = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const getProfile = async () => {
    try {
      const response = await fetchProfile(user.token);
      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        console.log('Profile data received:', response);
        setProfile(response);
      }
    } catch (error) {
      console.error('Error in getProfile:', error);
      Alert.alert('Error', 'Tidak dapat mengambil data profil.');
    }
  };

  useEffect(() => {
    if (route.params?.updatedProfile) {
      console.log('Updated profile received:', route.params.updatedProfile);
      setProfile(route.params.updatedProfile);
      setRefreshKey(prev => prev + 1);
    }
  }, [route.params?.updatedProfile]);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [user, refreshKey]),
  );

  const handleLogout = () => {
    setUser(null);
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <ScrollView style={styles.profileContainer}>
      <Text style={styles.title}>Profile</Text>
      {profile ? (
        <>
          <Image
            source={
              profile.foto
                ? {
                    uri: `http://192.168.56.1/backendreactnative/React_native_futsal/${profile.foto}`,
                  }
                : require('../../assets/logos/bogor.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.item}>
            Username:{' '}
            <Text style={styles.isi}>
              {profile.username || 'Tidak tersedia'}
            </Text>
          </Text>
          <Text style={styles.item}>
            Email:{' '}
            <Text style={styles.isi}>{profile.email || 'Tidak tersedia'}</Text>
          </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() =>
            navigation.navigate('EditProfile', {
              profile,
              token: user.token,
            })
          }>
          <Text style={styles.ButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.ButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={handleLogout}>
          <Text style={styles.ButtonText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacing} />
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  isi: {
    fontSize: 16,
  },
  Button: {
    backgroundColor: '#6C77EB',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
  },
  buttonSpacing: {
    height: 30,
  },
});

export default Akun;
