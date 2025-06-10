import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';

function DrugLogInput(props) {
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  function handleAddDrug() {
    props.onAdd({
      drugName: drugName,
      dosage: dosage,
      time: time,
      notes: notes,
      id: Date.now().toString(),
    });
    setDrugName('');
    setDosage('');
    setTime('');
    setNotes('');
    props.handleCloseModal(); 
  }

  return (

    <Modal style={{ backgroundColor: '#f5f5f5' }} visible={props.addDrugModalVisible} animationType="slide">
      <Text style={styles.title}>Record Drug Administration</Text>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.inputModal}>
          <View>
            <Text style={styles.label}>Drug Name</Text>
            <TextInput value={drugName} style={styles.input} onChangeText={setDrugName} />
          </View>
          <View>
            <Text style={styles.label}>Dosage</Text>
            <TextInput value={dosage} style={styles.input} onChangeText={setDosage} />
          </View>
          <View>
            <Text style={styles.label}>Time</Text>
            <TextInput value={time} style={styles.input} onChangeText={setTime} />
          </View>
          <View>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              value={notes}
              style={styles.input}
              placeholder="Optional"
              onChangeText={setNotes}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={handleAddDrug}>
              <Text style={{ color: '#1066D8', fontSize: 17 }}>Add Drug</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.disconnectButton]} onPress={props.handleCloseModal}>
              <Text style={{ color: 'red', fontSize: 17 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/images/needle.png')} style={styles.image} />
        </View>
      </ScrollView>
     
    </Modal>
 
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#1066D8',
    alignSelf: 'center',
    padding: 20,
  },
  inputModal: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20,

  },
  btn: {
    marginHorizontal: 10,
    width: '40%',
    borderColor: '#1066D8',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  disconnectButton: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default DrugLogInput;
