import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StatistikaEkran = ({ waterIntakeData }) => { 
  console.log(waterIntakeData);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Povijest dnevnog unosa vode:</Text>
      {waterIntakeData.map(entry => (
        <View key={entry.date} style={styles.entryContainer}>
          <Text style={styles.entryText}>Datum: {entry.date.split('-').reverse().join('/')}</Text>
          <Text style={styles.entryText}>Količina: {entry.amount} L</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  entryContainer: {
    marginBottom: 8,
  },
  entryText: {
    fontSize: 16,
  },
});
  
  export default StatistikaEkran;
  