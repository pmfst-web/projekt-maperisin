import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, KeyboardAvoidingView, FontAwesome } from 'react-native';

import DnevniCilj from '../screens/DnevniCilj';
import Kalendar from '../screens/Kalendar';


const PocetniEkran = ({ waterIntakeData, setWaterIntakeData }) => {
  const [dailyGoal, setDailyGoal] = useState('');
  const [consumed, setConsumed] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [lastInputs, setLastInputs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    console.log(waterIntakeData);
  }, [waterIntakeData]);


  const handleSaveWaterIntake = () => {
    if (selectedDate === '') {
      // ako datum nije odabran, ne sprema se podatak
      return;
    }

    //da se u listu ne sprema više istih datuma
    const existingDataIndex = waterIntakeData.findIndex(
      entry => entry.date === selectedDate
    );
  
    if (existingDataIndex !== -1) {
      //ažurira postojeći unos
      const updatedData = [...waterIntakeData];
      updatedData[existingDataIndex].amount = consumed.toFixed(1);
      setWaterIntakeData(updatedData);
    } else {
      //dodaje novi unos
      const waterIntake = {
        date: selectedDate,
        amount: consumed.toFixed(1),
      };
      setWaterIntakeData([waterIntake, ...waterIntakeData]);
    }
  
    setSelectedDate('');
    setConsumed(0);
  };
  
  
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false);
  };

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
  

  //provjera je li postavljeni cilj dostignut zbog ispisa poruke
  useEffect(() => {
    if (parseFloat(dailyGoal) > 0 && consumed < parseFloat(dailyGoal)) {
      setShowCongratulations(false);
    } else if (parseFloat(dailyGoal) > 0 && consumed >= parseFloat(dailyGoal)) {
      setShowCongratulations(true);
    }
  }, [consumed, dailyGoal]);
  

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.buttonContainer}>
          <Button title="Postavi cilj" onPress={() => setIsModalVisible(true)} />
        </View>
        {dailyGoal !== '' && (
          <Text style={styles.goalText}>Dnevni cilj: {parseFloat(dailyGoal).toFixed(1).replace('.0', '')} L</Text>
        )}
      </View>
      <View style={styles.section}>
        <View style={styles.buttonContainer}>
          <Button title="Odaberi datum" iconName = 'calendar' onPress={() => setIsCalendarVisible(true)} />  
        </View>
        <Text style={styles.dateText}>Datum: {selectedDate ? selectedDate.split('-').reverse().join('/') : ''}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.consumedText}>Konzumirano: {consumed.toFixed(1).replace('.0', '')} L</Text>
        <View style={styles.buttonContainer}>
          <Button title="+ čaša (200ml)" onPress={() => handleAddWater(0.2)} />
          <View style={styles.separator} />
          <Button title="+ boca (500ml)" onPress={() => handleAddWater(0.5)} />
        </View>
        <Text style={styles.customInputLabel}>Unesi količinu vode (u litrama):</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Unesi količinu"
            value={customInput}
            onChangeText={text => setCustomInput(text)}
            keyboardType="numeric"
          /> 
          <View style={styles.separator} />
          <Button title="Unesi" onPress={handleUpdateWater} />
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Poništi unos" onPress={handleUndo} />    
        <Button title="Reset" onPress={handleReset} />   
        <Button title="Spremi" onPress={handleSaveWaterIntake} />
      </View>

      {isCalendarVisible && (
        <Kalendar
          isVisible={isCalendarVisible}
          onDayPress={handleDayPress}
          selectedDate={selectedDate}
        />
      )}

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
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#004080',
  },
  buttonContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center', 
  },
 
  goalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#004080',
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#004080',
  },
  consumedText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004080',
  },
  customInputLabel: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#004080',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#004080',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: '#004080',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: 'white'
  },
  congratulationsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004080',
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  separator: {
    width: 30,
  },
  
});

export default PocetniEkran;
