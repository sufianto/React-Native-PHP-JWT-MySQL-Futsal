import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Jadwal = () => {
  const [selectedTab, setSelectedTab] = useState('pertandingan');

  const jadwalPertandingan = [
    {
      id: 1,
      tanggal: '15 April 2024',
      waktu: '19:00 WIB',
      tim1: 'An-Nahl FA',
      tim2: 'Vamos FC',
      lapangan: 'Lapangan A',
      status: 'Akan Datang',
    },
    {
      id: 2,
      tanggal: '16 April 2024',
      waktu: '20:00 WIB',
      tim1: 'VE FC',
      tim2: 'Arsyil FC',
      lapangan: 'Lapangan B',
      status: 'Akan Datang',
    },
  ];

  const jadwalBooking = [
    {
      id: 1,
      tanggal: '14 April 2024',
      waktu: '18:00 WIB',
      lapangan: 'Lapangan A',
      durasi: '2 Jam',
      status: 'Dikonfirmasi',
    },
    {
      id: 2,
      tanggal: '17 April 2024',
      waktu: '19:00 WIB',
      lapangan: 'Lapangan B',
      durasi: '1 Jam',
      status: 'Menunggu',
    },
  ];

  const renderJadwalPertandingan = () => (
    <ScrollView>
      {jadwalPertandingan.map((item) => (
        <View key={item.id} style={styles.jadwalCard}>
          <View style={styles.headerCard}>
            <Text style={styles.tanggal}>{item.tanggal}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'Akan Datang' ? '#27AE60' : '#E74C3C' }
            ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          
          <View style={styles.matchInfo}>
            <Text style={styles.teamName}>{item.tim1}</Text>
            <Text style={styles.vs}>VS</Text>
            <Text style={styles.teamName}>{item.tim2}</Text>
          </View>
          
          <View style={styles.footerCard}>
            <Text style={styles.infoText}>{item.waktu}</Text>
            <Text style={styles.infoText}>{item.lapangan}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderJadwalBooking = () => (
    <ScrollView>
      {jadwalBooking.map((item) => (
        <View key={item.id} style={styles.jadwalCard}>
          <View style={styles.headerCard}>
            <Text style={styles.tanggal}>{item.tanggal}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'Dikonfirmasi' ? '#27AE60' : '#F1C40F' }
            ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          
          <View style={styles.bookingInfo}>
            <Text style={styles.lapanganText}>{item.lapangan}</Text>
            <Text style={styles.waktuText}>{item.waktu}</Text>
            <Text style={styles.durasiText}>Durasi: {item.durasi}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'pertandingan' && styles.activeTab]}
          onPress={() => setSelectedTab('pertandingan')}>
          <Text style={[styles.tabText, selectedTab === 'pertandingan' && styles.activeTabText]}>
            Jadwal Pertandingan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'booking' && styles.activeTab]}
          onPress={() => setSelectedTab('booking')}>
          <Text style={[styles.tabText, selectedTab === 'booking' && styles.activeTabText]}>
            Jadwal Booking
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'pertandingan' ? renderJadwalPertandingan() : renderJadwalBooking()}
      </View>
    </View>
  );
};

export default Jadwal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2C3E50',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2C3E50',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  jadwalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tanggal: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2C3E50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  teamName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#2C3E50',
  },
  vs: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#E74C3C',
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#7F8C8D',
  },
  bookingInfo: {
    padding: 10,
  },
  lapanganText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  waktuText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2C3E50',
    marginBottom: 5,
  },
  durasiText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#7F8C8D',
  },
});
