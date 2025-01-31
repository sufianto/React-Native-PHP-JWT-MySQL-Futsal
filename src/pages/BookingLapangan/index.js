import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const BookingLapangan = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);


  const lapanganList = [
    {
      id: 1,
      nama: 'Lapangan A',
      jenis: 'Rumput Sintetis',
      harga: 'Rp 150.000/jam',
      image: require('../../assets/logos/bogor.png'), // Pastikan gambar tersedia
    },
    {
      id: 2,
      nama: 'Lapangan B',
      jenis: 'Vinyl',
      harga: 'Rp 175.000/jam',
      image: require('../../assets/logos/bogor.png'), // Pastikan gambar tersedia
    },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00',
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Booking Lapangan</Text>
        
        {/* Daftar Lapangan */}
        {lapanganList.map((lapangan) => (
          <View key={lapangan.id} style={styles.lapanganCard}>
            <Image source={lapangan.image} style={styles.lapanganImage} />
            <View style={styles.lapanganInfo}>
              <Text style={styles.lapanganNama}>{lapangan.nama}</Text>
              <Text style={styles.lapanganJenis}>{lapangan.jenis}</Text>
              <Text style={styles.lapanganHarga}>{lapangan.harga}</Text>
            </View>
          </View>
        ))}

        {/* Pilih Waktu */}
        <Text style={styles.sectionTitle}>Pilih Waktu</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.timeContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Tombol Booking */}
        <TouchableOpacity style={styles.buttonBooking}>
          <Text style={styles.buttonText}>Booking Sekarang</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BookingLapangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  lapanganCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    overflow: 'hidden',
  },
  lapanganImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  lapanganInfo: {
    padding: 15,
  },
  lapanganNama: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2C3E50',
  },
  lapanganJenis: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#7F8C8D',
    marginTop: 5,
  },
  lapanganHarga: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#27AE60',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeSlot: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F6FA',
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#2C3E50',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#2C3E50',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  buttonBooking: {
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
}); 