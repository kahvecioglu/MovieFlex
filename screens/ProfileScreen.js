import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Material Icons'dan kalp ikonu

const ProfileScreen = () => {
  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
      <TouchableOpacity style={styles.heartButton} onPress={() => {}}>
        <Icon name="favorite" size={28} color="red" /> 
        {/* İçi dolu kırmızı kalp */}
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} 
        style={styles.profileImage}
      />

      <Text style={styles.name}>Buğra Kahvecioğlu</Text>
      <Text style={styles.email}>bugra@example.com</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default ProfileScreen;
