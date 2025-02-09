import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { FavoritesProvider } from '../MovieFlex/compenents/FavoritesContext'; // Context provider'ı import ediyoruz
import HomeScreen from '../MovieFlex/screens/HomeScreen';
import SearchScreen from '../MovieFlex/screens/SearchScreen';
import ProfileScreen from '../MovieFlex/screens/ProfileScreen';
import DetailsScreen from '../MovieFlex/screens/DetailsScreen';
import { StatusBar } from 'react-native'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MovieTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Filmler') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Film ara') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.83)', // Yarı saydam arka plan
          borderTopWidth: 0, // Üst çizgiyi kaldır
          elevation: 0, // Android gölgesini kaldır
        },
      })}>
      <Tab.Screen name="Filmler" component={HomeScreen} options={{ headerShown: false }} />
  <Tab.Screen name="Film ara" component={SearchScreen} options={{ headerShown: false }} />
  <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        {/* Üst barı açık mavi yapıyoruz */}
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ADD8E6', // Açık mavi renk
            },
            headerTintColor: 'black', // Yazı rengini belirleme
          }}>
          <Stack.Screen name="Home" component={MovieTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
