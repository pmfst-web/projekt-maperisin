import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatistikaEkran = (props) => {
    const { history } = props;
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Povijest dnevnog unosa vode:</Text>
        {history.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>Datum: {day.date}</Text>
            <Text style={styles.dayText}>Konzumirano: {day.consumed} L</Text>
          </View>
        ))}
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
  