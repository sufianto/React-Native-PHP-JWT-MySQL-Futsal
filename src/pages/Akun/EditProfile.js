import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, TextInput, Button, Image, Alert , Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';



const EditProfil = ({ navigation, route }) => {
    const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (route.params?.profile) {
      const { profile } = route.params;
      setName(profile.username || '');
      setEmail(profile.email || '');
      setProfileImage(profile.foto || null);
    }
  }, [route.params?.profile]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel && result.assets?.[0]?.uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('username', name);
      formData.append('email', email);
      
      if (imageUri) {
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        
        formData.append('foto', {
          uri: imageUri,
          type: `image/${fileType}`,
          name: `profile.${fileType}`,
        });
      }

      const response = await axios.post(
        'http://192.168.56.1/backendreactnative/React_native_futsal/update_profile.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${route.params?.token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Sukses', 'Profil berhasil diperbarui');
        
        setTimeout(() => {
          navigation.navigate('Akun', {
            updatedProfile: response.data.data,
            timestamp: new Date().getTime()
          });
        }, 500);
      } else {
        Alert.alert('Error', response.data.message || 'Gagal memperbarui profil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Gagal memperbarui profil');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Edit Profil</Text>
      <View style={{ marginVertical: 10 }}>
        <Text>Nama</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Email</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Foto Profil</Text>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginVertical: 10 }} />
        ) : (
          <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, marginVertical: 10 }} />
        )}
        {/* <Button title="Pilih Gambar" onPress={pickImage} /> */}
        <TouchableOpacity style={styles.Button} onPress={pickImage}>
          <Text style={styles.ButtonText}>Pilih Gambar</Text>
        </TouchableOpacity>
      </View>
         <TouchableOpacity style={styles.Button} onPress={handleSave}>
          <Text style={styles.ButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      {/* <Button title="Simpan Perubahan" onPress={handleSave} /> */}
    </View>

    
  );
};
export const styles = StyleSheet.create({

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
export default EditProfil;