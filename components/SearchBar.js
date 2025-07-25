import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Entypo  } from '@expo/vector-icons';

export default function SearchBar({ city, setCity, onSearch, onUseLocation  }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#aaa"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Feather name="search" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onUseLocation}>
        <Entypo name="location-pin" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    marginRight: 6,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginLeft: 4,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});