import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const PaketLangganan = ({ navigation }) => {
  const paketList = [
    {
      id: 1,
      nama: 'Paket Bronze',
      harga: 'Rp 500.000',
      durasi: '1 Bulan',
      benefit: [
        '4x Main per Bulan',
        'Jadwal Bebas',
        'Free Minuman',
        'Member Card',
      ],
    },
    {
      id: 2,
      nama: 'Paket Silver',
      harga: 'Rp 900.000',
      durasi: '1 Bulan',
      benefit: [
        '8x Main per Bulan',
        'Jadwal Bebas',
        'Free Minuman',
        'Member Card',
        'Free Jersey Tim',
      ],
    },
    {
      id: 3,
      nama: 'Paket Gold',
      harga: 'Rp 1.500.000',
      durasi: '1 Bulan',
      benefit: [
        '12x Main per Bulan',
        'Jadwal Bebas',
        'Free Minuman & Snack',
        'Member Card',
        'Free Jersey Tim',
        'Priority Booking',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Pilih Paket Langganan</Text>
        {paketList.map((paket) => (
          <View key={paket.id} style={styles.paketCard}>
            <Text style={styles.paketNama}>{paket.nama}</Text>
            <Text style={styles.paketHarga}>{paket.harga}</Text>
            <Text style={styles.paketDurasi}>{paket.durasi}</Text>
            <View style={styles.benefitContainer}>
              {paket.benefit.map((item, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.benefitText}>{item}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.buttonBeli}>
              <Text style={styles.buttonText}>Pilih Paket</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PaketLangganan;

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
  paketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paketNama: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  paketHarga: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#27AE60',
    marginBottom: 5,
  },
  paketDurasi: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#7F8C8D',
    marginBottom: 15,
  },
  benefitContainer: {
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 20,
    color: '#27AE60',
    marginRight: 10,
  },
  benefitText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#2C3E50',
  },
  buttonBeli: {
    backgroundColor: '#2C3E50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
}); 