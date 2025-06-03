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
import { Device } from "react-native-ble-plx";

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
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
  <View style={modalStyle.deviceCard}>
    <View style={modalStyle.deviceInfo}>
      <Text style={modalStyle.deviceName}>{item.item.name || "Unnamed Device"}</Text>
      <Text style={modalStyle.rssiText}>RSSI {item.item.rssi ?? "--"}</Text>
    </View>
    <TouchableOpacity onPress={connectAndCloseModal} style={modalStyle.connectButton}>
      <Text style={modalStyle.connectButtonText}>Connect</Text>
    </TouchableOpacity>
  </View>

  );
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

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
    <Modal
      style={modalStyle.modalContainer}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
    <SafeAreaView style={modalStyle.modalContainer}>
      <Text style={modalStyle.modalTitleText}>Scanning for devices</Text>
      <Text style={modalStyle.instructionText}>Select a monitoring device to begin</Text>
      {devices.length > 0 && (
      <FlatList
        contentContainerStyle={modalStyle.modalFlatlistContiner}
        data={devices}
        renderItem={renderDeviceModalListItem}
        ItemSeparatorComponent={() => (
          <View style={modalStyle.separator} />
        )}
        keyExtractor={(item) => item.id}
      />
      )}
    </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({


  modalTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1066D8",
    marginBottom: 10,
  },
  instructionText: {
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


  modalContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 40,
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

export default DeviceModal;
