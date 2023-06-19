import React, {useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import PocetniEkran from './screens/PocetniEkran';
import PovijestEkran from './screens/PovijestEkran';

const Tab = createBottomTabNavigator();

const App = () => {

  const [waterIntakeData, setWaterIntakeData] = useState([]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.appName}>H2O App</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, //header Naslovna i Povijest sakriveni
              
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Naslovna') {
                iconName = 'home';
              } else if (route.name === 'Povijest') {
                iconName = 'filetext1';
              }

              return <AntDesign name={iconName} size={size} color={color} />;
            },
          })}
        >
        <Tab.Screen name="Naslovna">
            {props => (
              <PocetniEkran
                {...props}
                waterIntakeData={waterIntakeData}
                setWaterIntakeData={setWaterIntakeData}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Povijest">
            {props => (
              <PovijestEkran
                {...props}
                waterIntakeData={waterIntakeData}
              />
            )}
          </Tab.Screen>
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
    color: '#004080'
  },
});

export default App;
