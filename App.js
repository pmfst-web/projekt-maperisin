import React, {useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import PocetniEkran from './screens/PocetniEkran';
import StatistikaEkran from './screens/StatistikaEkran';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.appName}>H2O App</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, //header Naslovna i Statistika sakriveni
              
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Naslovna') {
                iconName = 'home';
              } else if (route.name === 'Statistika') {
                iconName = 'linechart';
              }

              return <AntDesign name={iconName} size={size} color={color} />;
            },
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            //headerShown: route.name !== 'Naslovna', //sakrivanje headera "Naslovna" sa početnog ekrana
          })}
        >
          <Tab.Screen name="Naslovna" component={PocetniEkran} />
          <Tab.Screen name="Statistika" component={StatistikaEkran} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00008B'
  },
});

export default App;
