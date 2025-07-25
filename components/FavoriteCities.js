import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function FavoriteCities({ favorites, onSelect, onRemove }) {
  if (!favorites.length) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map(city => (
          <View key={city} style={styles.cityContainer}>
            <TouchableOpacity onPress={() => onSelect(city)} style={styles.cityButton}>
              <Text style={styles.cityText}>{city}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRemove(city)} style={styles.removeButton}>
              <Feather name="x" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cityButton: {
    marginRight: 5,
  },
  cityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 2,
  },
});

