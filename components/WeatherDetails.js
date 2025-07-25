import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function WeatherDetails({ weather }) {
  if (!weather) return null;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="thermometer" size={24} color="#fff" />
          <Text style={styles.detailLabel}>Feels like</Text>
          <Text style={styles.detailText}>{Math.round(weather.main.feels_like)}°</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="droplet" size={24} color="#fff" />
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailText}>{weather.main.humidity}%</Text>
        </View>
      </View>
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-windy" size={24} color="#fff" />
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailText}>{weather.wind.speed} m/s</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="gauge" size={24} color="#fff" />
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailText}>{weather.main.pressure} hPa</Text>
        </View>
      </View>
      <View style={styles.tempRange}>
        <View style={styles.tempRangeItem}>
          <Feather name="arrow-up" size={18} color="#fff" />
          <Text style={styles.tempRangeText}>High: {Math.round(weather.main.temp_max)}°</Text>
        </View>
        <View style={styles.tempRangeItem}>
          <Feather name="arrow-down" size={18} color="#fff" />
          <Text style={styles.tempRangeText}>Low: {Math.round(weather.main.temp_min)}°</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    width: '100%',
    marginTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginVertical: 5,
  },
  detailText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  tempRange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  tempRangeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempRangeText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});