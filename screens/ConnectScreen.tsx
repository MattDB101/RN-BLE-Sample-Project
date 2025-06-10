import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import { useBLEContext } from "../BLEContext";
import DeviceConnectionModal from "./DeviceConnectionModal";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    setAllDevices
  } = useBLEContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const scanForDevices = async () => {
    setAllDevices([]);
    const granted = await requestPermissions();
    if (granted) {
      scanForPeripherals();
    }
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  const handleConnect = async (device: any) => {
    await connectToDevice(device);
    setIsModalVisible(false);
    //navigation.navigate("Connected");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Connect to a device to begin.</Text>
      </View>        
      <TouchableOpacity onPress={openModal} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Connect</Text>
      </TouchableOpacity>
      <Modal 
        visible={isModalVisible}       
        style={styles.modalContainer}
        animationType="slide"
        transparent={false}
      >
        <DeviceConnectionModal
          connectToPeripheral={handleConnect}
          closeModal={() => setIsModalVisible(false)}
          devices={allDevices}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: "#1066D8",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 25,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
