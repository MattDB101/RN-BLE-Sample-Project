import React from "react";
import { useBLEContext } from "../BLEContext";
import { useNavigation } from "@react-navigation/native";

import {
  Canvas,
  Circle,
  useClockValue,
  useComputedValue,
} from "@shopify/react-native-skia";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const ConnectedScreen = () => {
  const { deviceName, disconnectFromDevice } = useBLEContext();
const navigation = useNavigation();

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



const styles = StyleSheet.create({
  animation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  deviceNameTitleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  deviceNameText: {
    fontSize: 25,
    marginTop: 15,
  },
  connectedTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 200,
  },
  connectedTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  ctaButton: {
    backgroundColor: "#1066D8",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  disconnectButton: {
    backgroundColor: "red",
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

  return (
    <>
      <View style={styles.animation}>
        <Canvas style={{ height: 300, width: 300 }}>
          <Circle cx={150} cy={150} r={50} opacity={1} color="#1066D8"></Circle>
          <Circle cx={150} cy={150} r={scale} opacity={opacity} color="#1066D8" />
          <Circle cx={150} cy={150} r={scale2} opacity={opacity2} color="#1066D8" />
        </Canvas>
      </View>
      <View style={styles.connectedTitleWrapper}>
        <Text style={styles.connectedTitle}>
          {deviceName
            ? `Connected to ${deviceName}`
            : "Connecting..."}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("DrugLog")}
        style={styles.ctaButton}
      >
      <Text style={styles.ctaButtonText}>Go to Drug Log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={disconnectFromDevice}
        style={[styles.ctaButton, styles.disconnectButton]}
      >
        <Text style={styles.ctaButtonText}>Disconnect</Text>
      </TouchableOpacity>
    </>
  );
};

export default ConnectedScreen;
