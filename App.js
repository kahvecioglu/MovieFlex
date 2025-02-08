import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../MovieFlex/screens/HomeScreen'; // HomeScreen'i import ettik
import SearchScreen from '../MovieFlex/screens/SearchScreen'; // SearchScreen bileşenini import ettik
import ProfileScreen from '../MovieFlex/screens/ProfileScreen'; // ProfileScreen bileşenini import ettik

const Tab = createBottomTabNavigator();

export default function App() {
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
          tabBarInactiveTintColor: 'gray',tabBarStyle: {
            backgroundColor: '#3f4c6b', // Tab bar arka plan rengini değiştiriyoruz
            borderTopWidth: 0, // Tab bar'ın üst kenarındaki çizgiyi kaldırıyoruz
            elevation: 0, // Android için gölgeyi kaldırıyoruz
          }, headerStyle: {
            backgroundColor: '#a8c0ff', // Üst bar rengini koyu mavi yapıyoruz
          },
          headerTintColor: '#3f4c6b', // Üst bardaki başlık rengini beyaz yapıyoruz
          headerTitleAlign: 'center', // Başlığı ortalıyoruz
        })}
      >
        <Tab.Screen
          name="Filmler"
          component={HomeScreen}
          options={{
            headerTitle: 'Tüm Filmler Burada',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Film ara"
          component={SearchScreen}
          options={{
            headerTitle: 'Ne izlemek istersin ?',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            headerTitle: 'Profil',
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
