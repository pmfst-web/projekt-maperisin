import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatistikaEkran = () => { 
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Povijest dnevnog unosa vode:</Text>      
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    dayContainer: {
      marginBottom: 8,
    },
    dayText: {
      fontSize: 16,
    },
  });
  
  export default StatistikaEkran;
  