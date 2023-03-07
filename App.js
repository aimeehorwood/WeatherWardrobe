import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Weather from './components/Weather.js';


const img = require('./assets/header-background.jpg')
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style ={styles.backgroundImage} >
      <Weather />
      <StatusBar style="auto" />
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage:{
    flex: 1,
    resizeMode:"cover",
    justifyContent: 'center',
  },
});
