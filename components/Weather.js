import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

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
  const weatherDescription = weatherData.weather[0].description;
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
    <View>
      <Text>Location: {locationName}</Text>
      <Text>Temperature: {temperature}°C</Text>
      <Text>Weather: {weatherDescription}</Text>
      <Text>{suggestion}</Text>
    </View>
  );
}
