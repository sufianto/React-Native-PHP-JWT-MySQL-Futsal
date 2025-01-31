import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { registerUser } from '../../services/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email harus berisi karakter @');
      return;
    }
  
    try {
      console.log("Mengirim data ke server...");
      const response = await registerUser(username, email, password);
      console.log("Response:", response);
  
      if (response.message) {
        Alert.alert("Sukses", "Registrasi berhasil, silakan login!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Gagal", response.error || "Terjadi kesalahan saat registrasi.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Tidak dapat menghubungi server.");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Username</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <Text style={styles.title}>Email</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Text style={styles.title}>Password</Text>
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
       <TouchableOpacity style={styles.Button} title="Register" onPress={handleRegister}>
                                <Text style={styles.ButtonText}>Sign Up</Text>
                              </TouchableOpacity>
                                          
             {/* <Button title="Back to Register" onPress={() => navigation.navigate('Register')} /> */}
             <TouchableOpacity style={styles.Register}  title="Login" onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.RegisterButtonText1}>Already have account?<Text style={styles.RegisterButtonText}> Sign In</Text></Text>
                               
                              </TouchableOpacity>

      {/* <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} /> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
// });
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 8, 
    backgroundColor: '#fff' 
  },
  Button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    // marginTop: 10,
  },
  ButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  Register: { 
   padding: 5,
    alignItems: 'center',
    // fontWeight: 'light',
},
RegisterButtonText1: { color: 'grey', fontWeight: 'bold' },
  RegisterButtonText: { color: '#007bff', fontWeight: 'bold' },
});
export default RegisterScreen;
