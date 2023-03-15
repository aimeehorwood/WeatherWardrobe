import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Weather from './screens/Weather.js';
import Header from './components/header.js';
import {NavigationContainer} from '@react-navigation/native'


export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Header/>
      <Weather />
      <StatusBar style="auto" />
      </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
