# SC2006-Native-Frontend

![image](https://github.com/neozhixuan/SC2006-Native-Frontend/assets/79783660/b56157f9-1829-4eeb-b3df-640fb933390e)

## System Specifications
- 21 > JRE Version >= 17
- Android API 34, Extension Level 3 Platform
- Node Package Manager

## System Setup
1. `npm uninstall -g react-native-cli`
2. `npm uninstall -g react-native`
3. `npm install -g react-native-cli`
4. `npm install -g react-native`

## Android Studio Setup
Install all necessary SDKs from https://reactnative.dev/docs/environment-setup

## JRE Setup for JRE 21
1. `cd frontend`
2. `cd android`
3. Open `gradle.properties` and add your old JDK version path `org.gradle.java.home=C:\\Program Files\\Java\\jdk-17.0.1`
4. `./gradlew clean`
5. `cd ..`

## Run the android app
1. Start the Google Pixel Emulator
2. `cd frontend`
3. `npm i`
4. `npx react-native start`
5. Press `a` to run android simulator (wait 15s)

## To debug:
https://stackoverflow.com/questions/42064283/could-not-connect-to-react-native-development-server-on-android/56744301#56744301

1. Add your IP address to <app-src>/android/app/src/.../react_native_config.xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="false">localhost</domain>
    <domain includeSubdomains="false">10.0.2.2</domain>
    <domain includeSubdomains="false">10.0.3.2</domain>
    <domain includeSubdomains="false">...</domain>
  </domain-config>
</network-security-config>

Then run a few commands:
cd <app-src>/android
./gradlew clean
cd <app-src>
react-native run-android

2. Cmd + M >> Settings >> Debug server host & port for device >> add your IP address and 8081 (?)

3. react-native run-android --port=8088

4. adb reverse tcp:8081 tcp:8081
