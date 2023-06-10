import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PocetniEkran = () => {
  const [dailyGoal, setDailyGoal] = useState('');
  const [consumed, setConsumed] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [lastInputs, setLastInputs] = useState([]);

  const handleAddWater = amount => {
    setConsumed(consumed + amount);
    setLastInputs([...lastInputs, amount]);
  };

  const handleUpdateWater = () => {
    const customAmount = parseFloat(customInput);
    if (!isNaN(customAmount) && customAmount > 0) {
      setConsumed(consumed + customAmount);
      setLastInputs([...lastInputs, customAmount]);
    }
    setCustomInput('');
  };

  const handleReset = () => {
    setConsumed(0);
    setLastInputs([]);
  };

  const handleUndo = () => {
    if (lastInputs.length > 0) {
      const lastInput = lastInputs[lastInputs.length - 1];
      if (consumed >= lastInput) {
        setConsumed(consumed - lastInput);
        setLastInputs(lastInputs.slice(0, -1));
      } else {
        setConsumed(0);
        setLastInputs([]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Postavi svoj dnevni cilj (u litrama):</Text>
      <TextInput
        style={styles.input}
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

      <Text style={styles.label}>Konzumirano: {consumed.toFixed(1).replace('.0', '')} L</Text>
      <View style={styles.buttonContainer}>
        <Button title="Dodaj čašu (200ml)" onPress={() => handleAddWater(0.2)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Dodaj bocu (500ml)" onPress={() => handleAddWater(0.5)} />
      </View>
      <Text style={styles.label}>Unesi količinu vode (u litrama):</Text>
      <TextInput
        style={styles.input}
        placeholder="Unesi količinu"
        value={customInput}
        onChangeText={text => setCustomInput(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Unesi" onPress={handleUpdateWater} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Poništi zadnju dodanu količinu" onPress={handleUndo} />    
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginBottom: 8,
  },
});

export default PocetniEkran;
