import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator'ı import ediyoruz
import HomeScreen from '../MovieFlex/screens/HomeScreen';
import SearchScreen from '../MovieFlex/screens/SearchScreen';
import ProfileScreen from '../MovieFlex/screens/ProfileScreen';
import DetailsScreen from '../MovieFlex/screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Stack Navigator'ı tanımlıyoruz

function MovieTabs() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

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
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#3f4c6b',
          borderTopWidth: 0,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: '#a8c0ff',
        },
        headerTintColor: '#3f4c6b',
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen
        name="Filmler"
        children={() => <HomeScreen addToFavorites={addToFavorites} />}
        options={{
          headerTitle: 'Tüm Filmler Burada',
        }}
      />
      <Tab.Screen
        name="Film ara"
        children={() => <SearchScreen addToFavorites={addToFavorites} />}
        options={{
          headerTitle: 'Ne izlemek istersin ?',
        }}
      />
      <Tab.Screen
        name="Profil"
        children={() => <ProfileScreen favorites={favorites} />}
        options={{
          headerTitle: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MovieTabs} // MovieTabs, Tab Navigator'ını içeriyor
          options={{ headerShown: false }} // Tab Navigator'da header gösterilmesin
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen} // Stack Navigator'da Details ekranı
          options={{ headerTitle: 'Movie Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
