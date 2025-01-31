import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from '../context/AuthContext';
// import { Home, Akun, Jadwal } from '../pages';
import { BottomTabNavigator } from '../components';
import Home from '../pages/Home/index';
import Jadwal from '../pages/Jadwal/index';
import Login from '../pages/Akun/Login';
import Register from '../pages/Akun/Register';
import Akun from '../pages/Akun/index';
import EditProfile from '../pages/Akun/EditProfile';
import ResetPassword from '../pages/Akun/ResetPassword';
import Team from '../pages/Team';
import PaketLangganan from '../pages/PaketLangganan';
import BookingLapangan from '../pages/BookingLapangan';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
      
     
      <Tab.Navigator  tabBar={props => <BottomTabNavigator {...props} />}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        {/* <Tab.Screen name="Team" component={Team} /> */}
        <Tab.Screen name="Jadwal" component={Jadwal} />
        <Tab.Screen name="Akun" component={Akun} options={{ headerShown: false }} />
        {/* <Tab.Screen name="Akun" component={EditProfile}  />
        <Tab.Screen name="Akun" component={ResetPassword}  /> */}
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> */}
      </Tab.Navigator>
     
    )
}

const Router = () => {
  return (
    <AuthProvider>
     <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profil' }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'Reset Password' }} />
          <Stack.Screen name="PaketLangganan" component={PaketLangganan} options={{ title: 'Paket Langganan' }} />
          <Stack.Screen name="BookingLapangan" component={BookingLapangan} options={{ title: 'Booking Lapangan' }} />
          <Stack.Screen name="Akun" component={Akun} />
           <Tab.Screen name="Team" component={Team} />
          {/* <Stack.Screen 
            name="Home" 
            component={Home} 
            options={({ route }) => ({
              title: `Welcome, ${route.params?.username || 'User'}`
            })} 
          /> */}
          {/* <Stack.Screen style={{ marginRight: 15 }}
            name="Akun" 
            component={Akun} 
            options={({ route }) => ({
              title: `Akun - ${route.params?.username || 'User'}`
            })} 
          /> */}
    </Stack.Navigator>
    </AuthProvider>
   
  );
};

export default Router;

const styles = StyleSheet.create({});
