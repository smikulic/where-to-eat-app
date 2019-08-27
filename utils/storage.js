import { AsyncStorage } from 'react-native';

export const listAllRestaurants = async () => {
  const restaurants = await AsyncStorage.getItem('WTE_restaurants');
  return JSON.parse(restaurants);
}
