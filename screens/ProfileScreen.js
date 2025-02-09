import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MovieCard from '../compenents/MovieCard';

const ProfileScreen = ({ favorites, addToFavorites, removeFromFavorites }) => {
  console.log('Favori filmlerin sayısı:', favorites.length); 
  console.log('Favori filmler:', favorites); 

  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
   

      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Buğra Kahvecioğlu</Text>
      <Text style={styles.email}>bugra@example.com</Text>
      <Text style={styles.favoritesTitle}>Favori Filmlerim</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFavorite={true} // Her zaman favori ekranında olduğunda true olacak
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContentContainer}
          style={styles.flatList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Favori film bulunamadı.</Text>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          key={`flatlist-${favorites.length}`}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heartButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#eee',
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
