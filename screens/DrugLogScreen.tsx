import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DrugLogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drug Log Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DrugLogScreen;

