import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather.js';
import {Header} from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Header
        backgroundImage={require('./assets/header-background.jpg')}
        centerComponent={{ text: 'Weather Wardrobe', style: { color: '#fff' } }}
      />
      <View style={styles.content}>
        <Weather />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
