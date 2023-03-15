import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Weather from './screens/Weather.js';
import Header from './components/header.js';


export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Weather />
      <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
