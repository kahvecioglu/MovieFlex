import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // İkonları ekledik

// Basit ekran bileşenleri
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  );
}

// Tab Navigator'ı oluştur
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Route'a göre ikonları belirle
            if (route.name === 'Filmler') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Film ara') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // İkonu döndür
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: () => null,
          tabBarActiveTintColor: 'tomato', // Aktif tab rengi
          tabBarInactiveTintColor: 'gray', // Pasif tab rengi
        })}
      >
        <Tab.Screen
          name="Filmler"
          component={HomeScreen}
          options={{
            headerTitle:"Tüm Filmler Burada",
            headerTitleAlign: 'center', // Home ekranının başlığını ortalar
          }}
        />
        <Tab.Screen
          name="Film ara"
          component={SearchScreen}
          options={{
            headerTitle:"Ne izlemek istersin ?",
            headerTitleAlign: 'center', // Search ekranının başlığını ortalar
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            headerTitle:"Profil",
            headerTitleAlign: 'center', // Profile ekranının başlığını ortalar
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
