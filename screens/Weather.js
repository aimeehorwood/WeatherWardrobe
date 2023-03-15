import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import * as Location from 'expo-location';

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
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=65ef5802c8e0f666c9026a3a439f2330`)
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
  } else if (temperature < 4) {
    suggestion = 'It\'s cold outside, wear some earmuffs!';
  } else if (weatherDescription.includes('rain') || weatherDescription.includes('thunderstorm')) {
    suggestion = 'Bring an umbrella with you!';
  } else {
    suggestion = 'Enjoy the weather today!';
  }

  return (
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}> {locationName}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>{temperature}°C</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>{weatherDescription}</Text>
          </View>
          <View style={styles.recommendation}>
            <Text style={styles.cardText}>{suggestion}</Text>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#68f3ce',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 10,
    width: '90%',
    height: '18%',

    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
  },
  recommendation: {
    backgroundColor: '#35a7ff',
    borderRadius: 400,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 30,
    width: '90%',
    height: '18%',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 5,
    color: 'black',
  },
});
