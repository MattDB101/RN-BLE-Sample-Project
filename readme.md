# BLE Monitor App

A React Native application designed to interact with Bluetooth-LE devices. It scan for nearby devices, establishs a connection, and interacts with connected hardware for data logging purposes. This project serves as a proof-of-concept demo app for a larger, production ready system I have previously developed. The goal of this demo is to showcase how RN can be used to build mobile interfaces for IoT-connected devices, focusing on BLE communication and navigation flow.

This demo is isolated to show just the BLE workflow and navigation system, while omitting sensitive features and data from the  production app.

---

## 📱 Features

- 🔍 Scan for nearby BLE devices
- 📶 Display device signal strength (RSSI)
- 🔗 Connect to a BLE device
- 🔄 Disconnect safely
- 🧭 Simple Navigation between screens
- ⚠️ Alerts on failed connection
- 🎨 Clean Figma based UI
- 🎯 Modular, extensible BLE hook
- 🧠 Global BLE context provider wrapper 

---

## 🛠 Tech Stack

- **React Native**
- **TypeScript**
- **Expo** or bare React Native
- **React Navigation**
- **react-native-ble-plx** – BLE communication

---

## ⚙️ Build & Run

Before running the app, make sure to install all dependencies:
```
npm install
```
Then, to build and run the app on a physical Android device using a custom development client:
```
cd android
./gradlew assembleDebug
adb -s <your-device-id> install -r app/build/outputs/apk/debug/app-debug.apk
cd ..
npx expo start --dev-client
```
