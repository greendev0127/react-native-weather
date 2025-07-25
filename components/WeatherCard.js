import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function WeatherCard({ weather, handleAddFavorite }) {
  if (!weather) return null;

  return (
    <View style={styles.weatherCard}>
      <View style={styles.weatherHeader}>
        <View style={styles.headerContainer}>
          <Text style={styles.cityName}>
            <Feather name="map-pin" size={22} color="#fff" /> {weather.name},{" "}
            {weather.sys.country}
          </Text>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={handleAddFavorite}
          >
            <Feather name="heart" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 0,
  },
  weatherHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  heartButton: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(225,0,0,0.18)",
    borderRadius: 20,
    padding: 8,
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
});