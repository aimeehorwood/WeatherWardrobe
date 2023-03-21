import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import Header from './components/header.js';
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from './appNavigator.js';


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <AppNavigator />
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