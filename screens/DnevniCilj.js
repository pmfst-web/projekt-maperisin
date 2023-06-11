import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';

const DnevniCilj = ({ dailyGoal, setDailyGoal, onSave, onCancel }) => {
  return (
    <View style={styles.modalContent}>
        <Text style={styles.modalLabel}>Unesite dnevni cilj (u litrama):</Text>
        <TextInput
            style={styles.modalInput}
            placeholder="Unesite cilj"
            value={dailyGoal}
            onChangeText={text => setDailyGoal(text)}
            onBlur={() => {
            if (!isNaN(parseFloat(dailyGoal)) && parseFloat(dailyGoal) > 0) {
                setDailyGoal(parseFloat(dailyGoal));
            }
            }}
            keyboardType="numeric"
        />
        <View style={styles.modalButtonContainer}>
            <Button title="Spremi" onPress={onSave} />
            <View style={styles.buttonSeparator} />
            <Button title="Odustani" onPress={onCancel} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 100, //dodatno odmaknut od headera
    margin: 30,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonSeparator: {
    width: 30,
  },
});

export default DnevniCilj;