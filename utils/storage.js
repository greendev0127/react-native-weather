import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITE_CITIES';

export async function getFavoriteCities() {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function addFavoriteCity(city) {
  const favorites = await getFavoriteCities();
  if (!favorites.includes(city)) {
    favorites.push(city);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export async function removeFavoriteCity(city) {
  let favorites = await getFavoriteCities();
  favorites = favorites.filter(item => item !== city);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}