import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
} from 'react-native';
import { listAllRestaurants } from '../utils/storage';
import { RestaurantsContext } from '../App';

export default class AddRestaurantScreen extends React.Component {
  static contextType = RestaurantsContext;

  constructor(props) {
    super(props);

    this.handleAddRestaurant = this.handleAddRestaurant.bind(this);

    this.state = {
      restaurantInputText: '',
      restaurants: [],
    };
  }

  componentDidMount() {
    listAllRestaurants().then((result) => {
      if (this.state.restaurants.length > 0) return;
      
      this.setState({ restaurants: result });
    })
  }

  handleAddRestaurant = async () => {
    try {
      const { restaurants, restaurantInputText } = this.state;
      restaurants.push({ name: restaurantInputText });
      const updatedRestaurants = JSON.stringify(restaurants);

      await AsyncStorage.setItem('WTE_restaurants', updatedRestaurants);
      this.setState({ restaurants });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { restaurants } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  
          <View style={styles.mainContainer}>
            <Text style={styles.mainContainerTextSecondary}>
              Enter restaurant you like:
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(restaurantInputText) => this.setState({ restaurantInputText })}
              value={this.state.restaurantInputText}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleAddRestaurant}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            { restaurants.length === 0 && (
              <Text style={styles.mainContainerTextSecondary}>
                No restaurants added.
              </Text>
            )}
          </View>
          <View style={styles.restaurantList}>
            <Text style={styles.restaurantListText}>
              Your favorite restaurants
            </Text>
            { restaurants.length > 0 && (
              restaurants.map((restaurant, key) => {
                return (
                  <Text key={key} style={styles.restaurantListItem}>
                    {restaurant.name}
                  </Text>
                )
              })
            )}
          </View>
  
        </ScrollView>
      </View>
    );
  }
}

AddRestaurantScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 200,
  },
  mainContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  mainContainerTextSecondary: {
    marginTop: 50,
    marginBottom: 25,
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 26,
    textAlign: 'center',
  },
  restaurantList: {
    marginLeft: 0,
    paddingLeft: 50,
    textAlign: 'left',
  },
  restaurantListText: {
    fontSize: 22,
    color: '#3F94FF',
  },
  restaurantListItem: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 22,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(96,100,109, 1)',
    borderWidth: 1,
  },
  textInput: {
    width: '100%',
    height: 60,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(96,100,109, 1)',
    borderWidth: 1,
    fontSize: 26,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 55,
    marginVertical: 30,
    borderRadius: 30,
    backgroundColor: '#3F94FF',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    lineHeight: 22,
    textAlign: 'center',
  },
});
