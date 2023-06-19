import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PovijestEkran = ({ waterIntakeData }) => { 
  //sortiranje podatka o unosu vode po datumima (od najnovijeg do najstarijeg)
  const sortedData = waterIntakeData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Povijest dnevnog unosa vode:</Text>
      {sortedData.map(entry => (
        <View key={entry.date} style={styles.entryContainer}>
          <Text style={styles.dateText}>
            Datum: {entry.date ? entry.date.split('-').reverse().join('/') : ''}
          </Text>
          <Text style={styles.amountText}>Količina: {entry.amount} L</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADD8E6',
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#004080'
  },
  entryContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004080'
  },
  amountText: {
    fontSize: 14,
    color: '#004080',
  },
});
  
export default PovijestEkran;
  