import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

function getDayName(dt_txt) {
  const date = new Date(dt_txt);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

// Helper to get one forecast per day (e.g. 12:00)
function getDailyForecasts(list) {
  const daily = [];
  const seen = {};
  list.forEach(item => {
    const hour = new Date(item.dt_txt).getHours();
    if (hour === 12 && !seen[item.dt_txt.slice(0, 10)]) {
      daily.push(item);
      seen[item.dt_txt.slice(0, 10)] = true;
    }
  });
  // If less than 5 days, fill with closest to 12:00
  if (daily.length < 5) {
    const days = {};
    list.forEach(item => {
      const day = item.dt_txt.slice(0, 10);
      if (!days[day] || Math.abs(new Date(item.dt_txt).getHours() - 12) < Math.abs(new Date(days[day].dt_txt).getHours() - 12)) {
        days[day] = item;
      }
    });
    return Object.values(days).slice(0, 5);
  }
  return daily.slice(0, 5);
}

export default function ForecastList({ forecast }) {
  if (!forecast || !forecast.list) return null;
  const daily = getDailyForecasts(forecast.list);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <FlatList
        data={daily}
        keyExtractor={item => item.dt_txt}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.day}>{getDayName(item.dt_txt)}</Text>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }}
            />
            <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>
            <Text style={styles.desc}>{item.weather[0].main}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
    width: 100,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 0,
  },
  day: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 4,
  },
  temp: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  desc: {
    color: '#eee',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});