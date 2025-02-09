import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavorites } from '../compenents/FavoritesContext'; // Context'i kullanıyoruz
import MovieCard from '../compenents/MovieCard';

const ProfileScreen = () => {
  const { favorites } = useFavorites(); // Favori filmleri Context'ten alıyoruz

  // numColumns'ı favori sayısına göre ayarlıyoruz
  const numColumns = 2;

  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
      {/* Kullanıcı profil fotoğrafı ve ismi */}
      <View style={styles.profileHeader}>
        <Image source={require('../assets/person.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Buğra Kahvecioğlu</Text>
          <Text style={styles.userEmail}>buğrakahvecioglu@example.com</Text>
        </View>
      </View>

      {/* Favori Filmler Başlığı */}
      <Text style={styles.favoritesTitle}>Favori Filmlerim</Text>

      <FlatList
        data={favorites}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Favori film bulunamadı.</Text>
        )}
        numColumns={numColumns}  // Burada numColumns dinamik olarak ayarlanıyor
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40, // Ekranın üst kısmına padding ekledik
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // Profil başlığından sonraya daha fazla boşluk ekledik
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#fff',
  },
  favoritesTitle: {
    fontSize: 24,
    color: '#fff',
    marginTop:80,
    marginBottom: 20, // Favori başlığından sonra biraz boşluk ekledik
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileScreen;
