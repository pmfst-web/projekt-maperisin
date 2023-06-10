import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Modal, Pressable, TouchableWithoutFeedback} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';


import PocetniEkran from './screens/PocetniEkran';
import StatistikaEkran from './screens/StatistikaEkran';

const Stack = createNativeStackNavigator();

const App = () => {
  const [selectedTab, setSelectedTab] = useState('PocetniEkran');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabSelection = (tab) => {
    setSelectedTab(tab);
    setIsDropdownOpen(false);
  };

  const handleOutsidePress = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };


  const renderHeader = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#f9f9f9" barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.appName}>H20 App</Text>
          <TouchableOpacity style={styles.menuIcon} onPress={toggleDropdown}>
            <AntDesign name="menu-fold" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {isDropdownOpen && (
          <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.dropdownContainer}>
              <Pressable style={styles.dropdownItem} onPress={() => handleTabSelection('PocetniEkran')}>
                <Text style={selectedTab === 'PocetniEkran' ? styles.selectedTabText : styles.tabText}>Dnevni cilj</Text>
              </Pressable>
              <Pressable style={styles.dropdownItem} onPress={() => handleTabSelection('StatistikaEkran')}>
                <Text style={selectedTab === 'StatistikaEkran' ? styles.selectedTabText : styles.tabText}>Statistika</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        )}
      </SafeAreaView>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
              header: () => renderHeader(),
            }}
          >
            <Stack.Screen
              name="PocetniEkran"
              component={PocetniEkran}
            />
            <Stack.Screen
              name="StatistikaEkran"
              component={StatistikaEkran}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  selectedTabText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});


export default App;
