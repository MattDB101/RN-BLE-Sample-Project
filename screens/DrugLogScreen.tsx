import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';

import DrugLogItem from '../components/DrugLogItem';
import DrugLogInput from '../components/DrugLogInput';

  type DrugLogItem = {
    id: string;
    drugName: string;
    dosage: string;
    time: string;
    notes: string;
  };

const DrugLogScreen = () => {
  const [log, setLog] = useState<DrugLogItem[]>([]);
  const [addDrugModalVisible, setAddDrugModalVisible] = useState(false);

  function handleAddDrug(newDrug: DrugLogItem) {
    setLog((prevLog) => [...prevLog, newDrug]);
  }

  function handleDeleteDrug(id: string) {
    console.log('Deleting drug at id:', id);
    setLog((prevLog) => prevLog.filter((item) => item.id !== id));
  }

  function handleCloseModal() {
    setAddDrugModalVisible(false);
  }

  return (
    <>
    <DrugLogInput onAdd={handleAddDrug} addDrugModalVisible={addDrugModalVisible} handleCloseModal={handleCloseModal} />
        
    <View style={styles.container}>
      <Text style={styles.title}>Drug Log</Text>
      <Text style={styles.instructionText}>Press & Hold to Delete</Text>

      <View style={styles.pageContainer}>
        {log.length > 0 ? (
          <View style={styles.logContainer}>
          <FlatList
            data={[...log].reverse()}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => <DrugLogItem item={item} onDelete={handleDeleteDrug} />}
          />
        </View>
        ) : (
          <Text style={{marginTop: 50,}}>No drugs logged yet.</Text>
        )}

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => setAddDrugModalVisible(true)}>
            <Text style={{ color: '#fff', fontSize: 17 }}>Add Drug</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 20,
    width: '100%',
    backgroundColor: '#1066D8',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
    btnContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#1066D8',
    padding: 20,
  },

  logContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column-reverse',
    marginTop: 10,
    paddingVertical: 10,
  },

  instructionText: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    alignSelf: 'center',
    fontSize: 18,
    width: '90%',
    color: "#666",
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 15,
    textAlign: "center",
  },
});

export default DrugLogScreen;

