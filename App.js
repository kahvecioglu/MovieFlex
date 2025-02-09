import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../MovieFlex/screens/HomeScreen';
import SearchScreen from '../MovieFlex/screens/SearchScreen';
import ProfileScreen from '../MovieFlex/screens/ProfileScreen';
import DetailsScreen from '../MovieFlex/screens/DetailsScreen';


const Tab = createBottomTabNavigator();

export default function App() {
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
    <NavigationContainer>
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
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Film ara"
          children={() => <SearchScreen addToFavorites={addToFavorites} />}
          options={{
            headerTitle: 'Ne izlemek istersin ?',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Profil"
          children={() => <ProfileScreen favorites={favorites} />}
          options={{
            headerTitle: 'Profil',
            headerTitleAlign: 'center',
          }}
        /><Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerTitle: 'Movie Details' }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}