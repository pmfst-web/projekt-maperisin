import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

import DnevniCilj from '../screens/DnevniCilj';


const PocetniEkran = () => {
  const [dailyGoal, setDailyGoal] = useState('');
  const [consumed, setConsumed] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [lastInputs, setLastInputs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  //prati je li dan završen
  const [isDayOver, setIsDayOver] = useState(false);

  const handleAddWater = amount => {
    setConsumed(consumed + amount);
    setLastInputs([...lastInputs, amount]);
  };

  //provjera je li dan završen prije dodavanja vode
  const handleUpdateWater = () => {
    if (isDayOver) {
      // Resetiranje broja unesene količine na 0
      setConsumed(0);
      setLastInputs([]);
      setIsDayOver(false);
    }
  
    const input = parseFloat(customInput);
    if (!isNaN(input) && input > 0) {
      setConsumed(consumed + input);
      setLastInputs([...lastInputs, input]);
      setCustomInput('');
    }
  };

  const handleReset = () => {
    setConsumed(0);
    setLastInputs([]);
    setShowCongratulations(false);
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

  const handleSaveGoal = () => {
    if (!isNaN(parseFloat(dailyGoal)) && parseFloat(dailyGoal) > 0) {
      setDailyGoal(parseFloat(dailyGoal));
    }
    setIsModalVisible(false);
  };

  const handleCancelGoal = () => {
    setIsModalVisible(false);
  };

  //označava kraj dana i resetira broj unesene količine
  const handleEndDay = () => {
    setIsDayOver(true);
    //dodaje završene dane u povijest
    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString();
  
    const newDay = {
      date: formattedDate,
      consumed: consumed.toFixed(1),
    };
  
    setHistory(prevHistory => [...prevHistory, newDay]);
  };
  

  //provjera je li postavljeni cilj dostignut zbog ispisa poruke
  useEffect(() => {
    if (parseFloat(dailyGoal) > 0 && consumed < parseFloat(dailyGoal)) {
      setShowCongratulations(false);
    } else if (parseFloat(dailyGoal) > 0 && consumed >= parseFloat(dailyGoal)) {
      setShowCongratulations(true);
    }
  }, [consumed, dailyGoal]);

  //poziva funkciju handleEndDay kada dan završi
  useEffect(() => {
    const currentTime = new Date();
    const endOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 23, 59, 59);
  
    const timer = setTimeout(() => {
      handleEndDay();
    }, endOfDay - currentTime);
  
    return () => {
      clearTimeout(timer);
    };
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Postavi cilj" onPress={() => setIsModalVisible(true)} />
      </View>
      {dailyGoal !== '' && (
        <Text style={styles.goalText}>Dnevni cilj: {parseFloat(dailyGoal).toFixed(1)} L</Text>
      )}

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
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <DnevniCilj
            dailyGoal={dailyGoal}
            setDailyGoal={setDailyGoal}
            onSave={handleSaveGoal}
            onCancel={handleCancelGoal}
          />
        </View>
      </Modal>
      {showCongratulations && <Text style={styles.congratulationsText}>Čestitamo, ostvarili ste željeni cilj!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADD8E6',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00008B'
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
  congratulationsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    color: '#00008B',
  },
  
});

export default PocetniEkran;
