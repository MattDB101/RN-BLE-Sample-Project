import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import {
  Canvas,
  Circle,
  useClockValue,
  useComputedValue,
} from "@shopify/react-native-skia";
import { Device } from "react-native-ble-plx";

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};



const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(async () => {
    try {
      await connectToPeripheral(item.item); 
      closeModal(); 
    } catch (error) {
      console.error("Connection failed:", error);
      Alert.alert("Connection Failed", "Could not connect to the device. Please try again.");
    }
  }, [closeModal, connectToPeripheral, item.item]);

  return (
  <View style={styles.deviceCard}>
    <View style={styles.deviceInfo}>
      <Text style={styles.deviceName}>{item.item.name || "Unnamed Device"}</Text>
      <Text style={styles.rssiText}>RSSI {item.item.rssi ?? "--"}</Text>
    </View>
    <TouchableOpacity onPress={connectAndCloseModal} style={styles.connectButton}>
      <Text style={styles.connectButtonText}>Connect</Text>
    </TouchableOpacity>
  </View>

  );
};

const DeviceConnectionModal: FC<DeviceModalProps> = (props) => {
  const { devices, connectToPeripheral, closeModal } = props;


    const clock1 = useClockValue();
  
    const interval = 1250;
  
    const scale = useComputedValue(() => {
      return ((clock1.current % interval) / interval) * 130;
    }, [clock1]);
  
    const opacity = useComputedValue(() => {
      return 0.9 - (clock1.current % interval) / interval;
    }, [clock1]);
  
    const scale2 = useComputedValue(() => {
      return (((clock1.current + 400) % interval) / interval) * 130;
    }, [clock1]);
  
    const opacity2 = useComputedValue(() => {
      return 0.9 - ((clock1.current + 400) % interval) / interval;
    }, [clock1]);
  

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  return (

    <SafeAreaView style={styles.modalContainer}>
      <Text style={styles.modalTitleText}>Scanning for devices</Text>

      {devices.length > 0 ?  (
      <>
        <Text style={styles.instructionText}>Select a monitoring device to begin</Text>
        <FlatList
          contentContainerStyle={styles.modalFlatlistContiner}
          data={devices}
          renderItem={renderDeviceModalListItem}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          keyExtractor={(item) => item.id}
        />
      </> 
      ) : (
        <View style={styles.animation}>
          <Canvas style={{ height: 300, width: 300 }}>
            <Circle cx={150} cy={150} r={50} opacity={1} color="#1066D8"></Circle>
            <Circle cx={150} cy={150} r={scale} opacity={opacity} color="#1066D8" />
            <Circle cx={150} cy={150} r={scale2} opacity={opacity2} color="#1066D8" />
          </Canvas>
        </View>
      )} 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    animation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  modalTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1066D8",
    marginBottom: 10,
  },
  instructionText: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    fontSize: 18,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    textAlign: "center",
  },
  modalFlatlistContiner: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  deviceInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,

  },
  rssiText: {
    fontSize: 14,
    color: "#888",
  },
  connectButton: {
    borderWidth: 1,
    borderColor: "#1066D8",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  connectButtonText: {
    color: "#1066D8",
    fontSize: 16,
    fontWeight: "500",
  },
  ctaButton: {
    backgroundColor: "#1066D8",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    height: 1,
    backgroundColor: "#DDD",
    alignSelf: "center",
    width: "95%",
    marginVertical: 6,
  },
});

export default DeviceConnectionModal;
