import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Keyboard,
  StatusBar,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const API_KEY = "3ede70e070638b01dc4ad67e9ec26e09";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    Keyboard.dismiss();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "City not found.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  // Function to get gradient colors based on temperature
  const getWeatherGradient = (temp) => {
    if (!temp) return ["#4f8cff", "#003366"]; // Default
    if (temp < 10) return ["#4facfe", "#00f2fe"]; // Cold
    if (temp < 25) return ["#4f8cff", "#4facfe"]; // Moderate
    return ["#ff7e5f", "#feb47b"]; // Hot
  };

  return (
    <LinearGradient
      colors={
        weather ? getWeatherGradient(weather.main.temp) : ["#4f8cff", "#003366"]
      }
      style={styles.gradientBackground}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Weatherly</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 30 }}
          />
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {weather && (
          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <Text style={styles.cityName}>
                <Feather name="map-pin" size={22} color="#fff" /> {weather.name}
                , {weather.sys.country}
              </Text>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View style={styles.weatherMain}>
              <Image
                style={styles.icon}
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                }}
              />
              <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
              <Text style={styles.desc}>{weather.weather[0].description}</Text>
            </View>

            <View style={styles.weatherDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons
                    name="thermometer"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.detailLabel}>Feels like</Text>
                  <Text style={styles.detailText}>
                    {Math.round(weather.main.feels_like)}°
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <Feather name="droplet" size={24} color="#fff" />
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailText}>
                    {weather.main.humidity}%
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons
                    name="weather-windy"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailText}>
                    {weather.wind.speed} m/s
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="gauge" size={24} color="#fff" />
                  <Text style={styles.detailLabel}>Pressure</Text>
                  <Text style={styles.detailText}>
                    {weather.main.pressure} hPa
                  </Text>
                </View>
              </View>

              <View style={styles.tempRange}>
                <View style={styles.tempRangeItem}>
                  <Feather name="arrow-up" size={18} color="#fff" />
                  <Text style={styles.tempRangeText}>
                    High: {Math.round(weather.main.temp_max)}°
                  </Text>
                </View>
                <View style={styles.tempRangeItem}>
                  <Feather name="arrow-down" size={18} color="#fff" />
                  <Text style={styles.tempRangeText}>
                    Low: {Math.round(weather.main.temp_min)}°
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "#fff",
    marginRight: 10,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
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
  weatherCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  weatherHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  dateText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  weatherMain: {
    alignItems: "center",
    marginVertical: 15,
  },
  icon: {
    width: 120,
    height: 120,
  },
  temp: {
    fontSize: 72,
    fontWeight: "200",
    color: "#fff",
    marginTop: -20,
    fontFamily: "Helvetica Neue",
  },
  desc: {
    fontSize: 20,
    color: "rgba(255,255,255,0.9)",
    marginTop: -10,
    textTransform: "capitalize",
    marginBottom: 15,
  },
  weatherDetails: {
    width: "100%",
    marginTop: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
  },
  detailLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginVertical: 5,
  },
  detailText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  tempRange: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  tempRangeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  tempRangeText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
});
