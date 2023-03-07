import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { stringifyValueWithProperty } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';

const API_KEY = '65ef5802c8e0f666c9026a3a439f2330';

export default function Weather() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
    }
  }, [location]);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const weatherDescription = weatherData.weather[0].description

  let suggestion = '';
  const locationName = weatherData.name;

  if (weatherDescription.includes('sunny') || weatherDescription.includes('clear')) {
    suggestion = 'Don\'t forget your sunglasses!';
  } else if (temperature < 10) {
    suggestion = 'It\'s cold outside, wear some earmuffs!';
  } else if (weatherDescription.includes('rain') || weatherDescription.includes('thunderstorm')) {
    suggestion = 'Bring an umbrella with you!';
  } else {
    suggestion = 'Enjoy the weather today!';
  }

  return (
    <ImageBackground source={require('../assets/header-background.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}> Location: {locationName}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}> Temperature: {temperature}°C</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Description: {weatherDescription}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>{suggestion}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 200,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    padding: 20,
    marginVertical: 10,
    width: '100%',
    height: '18%',

    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 5,
    color: 'white',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
  }
});
