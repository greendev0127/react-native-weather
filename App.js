import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Keyboard } from 'react-native';

const API_KEY = "3ede70e070638b01dc4ad67e9ec26e09"

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeather(null)
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    Keyboard.dismiss();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json()
      if(response.ok) {
        setWeather(data)
      } else {
        setError(data.message || 'City not found');
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter city name'
        value={city}
        onChangeText={setCity}
        onSubmitEditing={fetchWeather}
        returnKeyType='search'
       />
       <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
       </TouchableOpacity>
       {loading && <ActivityIndicator size='large' color='#007AFF' style={{marginTop: 20}} />}
       {error ? <Text style={styles.error}>{error}</Text> : null}
       {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
          />
        </View>
       )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 10,
  },
  desc: {
    fontSize: 20,
    color: '#555',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  icon: {
    width: 100,
    height: 100,
  },
});