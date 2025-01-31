import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from 'react-native';
import { loginUser } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
    const { setUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaUrl, setCaptchaUrl] = useState('http://192.168.56.1/backendreactnative/React_native_futsal/captcha.php');

    useEffect(() => {
        refreshCaptcha();
    }, []);

    const handleLogin = async () => {
        if (!username.trim()) {
            Alert.alert("Error", "Username harus diisi");
            return;
        }
    
        if (!password.trim()) {
            Alert.alert("Error", "Password harus diisi");
            return;
        }
    
        if (!captcha.trim()) {
            Alert.alert("Error", "CAPTCHA harus diisi");
            return;
        }
    
        try {
            const response = await loginUser(username.trim(), password.trim(), captcha.trim());
    
            if (response.token) {
                setUser({ token: response.token });
                navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
            } else {
                Alert.alert("Login Gagal", response.error || "Terjadi kesalahan");
                refreshCaptcha();
            }
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Error", "Tidak dapat menghubungi server.");
            refreshCaptcha();
        }
    };
    
    const refreshCaptcha = () => {
        setCaptchaUrl(`http://192.168.56.1/backendreactnative/React_native_futsal/captcha.php?t=${new Date().getTime()}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Username:</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} />

            <Text>Password:</Text>
            <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

            <Text>Masukkan CAPTCHA:</Text>
            <Image 
                key={captchaUrl} 
                source={{ uri: captchaUrl }} 
                style={styles.captchaImage} 
            />

            <TextInput style={styles.input} value={captcha} onChangeText={setCaptcha} />

            <TouchableOpacity onPress={refreshCaptcha}>
                <Text style={{ color: 'blue', textAlign: 'center', marginBottom: 10 }}>Refresh CAPTCHA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={handleLogin}>
                <Text style={styles.ButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Register} title="Register" onPress={() => navigation.navigate('Register')}>
                <Text style={styles.RegisterButtonText1}>Already have account?<Text style={styles.RegisterButtonText}> Sign Up</Text></Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
    Button: { backgroundColor: '#007bff', padding: 10, borderRadius: 10, alignItems: 'center' },
    ButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    captchaImage: { width: 150, height: 50, alignSelf: 'center', marginVertical: 10 },
    Register: { 
        padding: 5,
        alignItems: 'center',
    },
    RegisterButtonText1: { color: 'grey', fontWeight: 'bold' },
    RegisterButtonText: { color: '#007bff', fontWeight: 'bold' },
});

export default Login;
