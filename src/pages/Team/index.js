import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Team = () => {
  const navigation = useNavigation();
  const [selectedMenu, setSelectedMenu] = useState('myteam');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'myteam':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Tim Saya</Text>
            {/* Tambahkan konten tim saya di sini */}
            <Text style={styles.emptyText}>Anda belum memiliki tim</Text>
          </View>
        );
      case 'jointeam':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Gabung Tim</Text>
            {/* Tambahkan daftar tim yang bisa digabung */}
            <Text style={styles.emptyText}>Belum ada tim yang tersedia</Text>
          </View>
        );
      case 'createteam':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Buat Tim Baru</Text>
            {/* Form pembuatan tim baru */}
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>+ Buat Tim Baru</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[
            styles.menuButton,
            selectedMenu === 'myteam' && styles.selectedMenu,
          ]}
          onPress={() => setSelectedMenu('myteam')}>
          <Text
            style={[
              styles.menuText,
              selectedMenu === 'myteam' && styles.selectedMenuText,
            ]}>
            Tim Saya
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuButton,
            selectedMenu === 'jointeam' && styles.selectedMenu,
          ]}
          onPress={() => setSelectedMenu('jointeam')}>
          <Text
            style={[
              styles.menuText,
              selectedMenu === 'jointeam' && styles.selectedMenuText,
            ]}>
            Gabung Tim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuButton,
            selectedMenu === 'createteam' && styles.selectedMenu,
          ]}
          onPress={() => setSelectedMenu('createteam')}>
          <Text
            style={[
              styles.menuText,
              selectedMenu === 'createteam' && styles.selectedMenuText,
            ]}>
            Buat Tim
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>{renderContent()}</ScrollView>
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  menuContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  menuButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedMenu: {
    backgroundColor: '#2C3E50',
  },
  menuText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2C3E50',
  },
  selectedMenuText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  contentText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 20,
    color: '#2C3E50',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  createButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
}); 