import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, ScrollView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherDetails from '../components/WeatherDetails';
import ForecastList from '../components/ForecastList';
import { getWeatherByCity, getForecastByCity } from '../utils/api';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherGradient = (temp) => {
    if (!temp) return ['#4f8cff', '#003366'];
    if (temp < 10) return ['#4facfe', '#00f2fe'];
    if (temp < 25) return ['#4f8cff', '#4facfe'];
    return ['#ff7e5f', '#feb47b'];
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeather(null);
      setForecast(null);
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);
    Keyboard.dismiss();
    try {
      const data = await getWeatherByCity(city);
      if (data.cod === 200) {
        setWeather(data);
        const forecastData = await getForecastByCity(city);
        if (forecastData.cod === "200") {
          setForecast(forecastData);
        } else {
          setForecast(null);
        }
      } else {
        setError(data.message || 'City not found.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={weather ? getWeatherGradient(weather.main.temp) : ['#4f8cff', '#003366']}
      style={styles.gradientBackground}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Weatherly</Text>
        <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 30 }}
          />
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {weather && (
          <>
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
            <ForecastList forecast={forecast} />
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 8,
  },
});