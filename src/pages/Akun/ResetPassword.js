import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { resetPassword } from '../../services/api';

const ResetPassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Konfirmasi password tidak cocok.");
      return;
    }

    if (!newPassword || !oldPassword) {
      Alert.alert("Error", "Semua kolom harus diisi.");
      return;
    }

    try {
      const response = await resetPassword(oldPassword, newPassword);
      if (response.success) {
        Alert.alert("Sukses", "Password berhasil diubah.", [
          { 
            text: "OK", 
            onPress: () => navigation.goBack() 
          }
        ]);
      } else {
        Alert.alert("Error", response.error || "Gagal mereset password.");
      }
    } catch (error) {
      if (error.message.includes('Token')) {
        Alert.alert("Error", "Sesi Anda telah berakhir. Silakan login kembali.", [
          { 
            text: "OK", 
            onPress: () => navigation.replace('Login') 
          }
        ]);
      } else {
        Alert.alert("Error", error.message || "Terjadi kesalahan saat mereset password.");
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="Password Lama" 
        value={oldPassword} 
        onChangeText={setOldPassword} 
      />
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="Password Baru" 
        value={newPassword} 
        onChangeText={setNewPassword} 
      />
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="Konfirmasi Password Baru" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
});

export default ResetPassword;
