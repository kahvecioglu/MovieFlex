import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavorites } from '../compenents/FavoritesContext'; // Context'i kullanıyoruz
import MovieCard from '../compenents/MovieCard';

const ProfileScreen = () => {
  const { favorites } = useFavorites(); // Favori filmleri Context'ten alıyoruz

  // numColumns'ı favori sayısına göre ayarlıyoruz
  const numColumns = 2;

  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
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
    padding: 20,
  },
  favoritesTitle: {
    fontSize: 24,
    color: '#fff',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileScreen;
