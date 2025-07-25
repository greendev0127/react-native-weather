import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import WeatherDetails from "../components/WeatherDetails";
import FavoriteCities from "../components/FavoriteCities";

import {
  getFavoriteCities,
  addFavoriteCity,
  removeFavoriteCity,
} from "../utils/storage";
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from "../utils/api";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const favs = await getFavoriteCities();
      setFavorites(favs);
    })();
  }, []);

  const getWeatherGradient = (temp) => {
    if (!temp) return ["#4f8cff", "#003366"];
    if (temp < 10) return ["#4facfe", "#00f2fe"];
    if (temp < 25) return ["#4f8cff", "#4facfe"];
    return ["#ff7e5f", "#feb47b"];
  };

  const fetchWeather = async (cityParam) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      setForecast(null);
      return;
    }

    const cityToSearch = cityParam || city;

    setLoading(true);
    setError("");
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
        setError(data.message || "City not found.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const fetchWeatherByLocation = async () => {
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied.");
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const data = await getWeatherByCoords(latitude, longitude);
      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name); // Optionally update city input
        const forecastData = await getForecastByCoords(latitude, longitude);
        if (forecastData.cod === "200") {
          setForecast(forecastData);
        } else {
          setForecast(null);
        }
      } else {
        setError(data.message || "Could not fetch weather for your location.");
      }
    } catch (err) {
      setError("Unable to get location or weather data.");
    }
    setLoading(false);
  };

  const handleAddFavorite = async () => {
    if (weather && weather.name) {
      await addFavoriteCity(weather.name);
      const favs = await getFavoriteCities();
      setFavorites(favs);
    }
  };

  const handleRemoveFavorite = async (cityName) => {
    await removeFavoriteCity(cityName);
    const favs = await getFavoriteCities();
    setFavorites(favs);
  };

  const handleSelectFavorite = async (cityName) => {
    setCity(cityName);
    await fetchWeather(cityName);
  };

  return (
    <LinearGradient
      colors={
        weather ? getWeatherGradient(weather.main.temp) : ["#4f8cff", "#003366"]
      }
      style={styles.gradientBackground}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Weatherly</Text>
        <FavoriteCities
          favorites={favorites}
          onSelect={handleSelectFavorite}
          onRemove={handleRemoveFavorite}
        />
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => fetchWeather()}
          onUseLocation={fetchWeatherByLocation}
        />
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
            <WeatherCard weather={weather} handleAddFavorite={handleAddFavorite} />
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
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    letterSpacing: 1.5,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  error: {
    color: "#ff6b6b",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 8,
  },
});
