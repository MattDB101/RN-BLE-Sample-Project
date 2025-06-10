import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BLEProvider, useBLEContext } from "./BLEContext";
import ConnectedScreen from "./screens/ConnectedScreen";
import DrugLogScreen from "./screens/DrugLogScreen";
import ConnectScreen from "./screens/ConnectScreen";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Connected">
      <Stack.Screen name="Connected" component={ConnectedScreen} />
      <Stack.Screen name="DrugLog" component={DrugLogScreen} />
    </Stack.Navigator>
  );
};

const Root = () => {
  const { connectedDevice } = useBLEContext();

  return (
    <NavigationContainer>
      {connectedDevice ? (
        <MainNavigation />
      ) : (
        <ConnectScreen />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <BLEProvider>
      <Root />
    </BLEProvider>
  );
};

export default App;
