import React from 'react';
import { View, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format, isAfter } from 'date-fns';

const Kalendar = ({ isVisible, onDayPress, selectedDate }) => {

    //dodana funkcija kako se nebi mogli odabrati budući datumi već samo trenutni i prethodni
    const handleDayPress = (day) => {
        const selected = day.dateString;
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        if (isAfter(new Date(selected), new Date(currentDate))) {
            return;
        }
        onDayPress(day);
    };    
          
    return (
    <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                [selectedDate]: {
                    selected: true,
                    selectedColor: 'blue',
                },
                }}
                theme={{
                selectedDayBackgroundColor: 'blue',
                todayTextColor: 'blue',
                arrowColor: 'blue',
                }}
            />
            <Button title="Zatvori kalendar" onPress={onDayPress} />
        </View>
    </Modal>
    );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default Kalendar;
