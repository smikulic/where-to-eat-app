import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { listAllRestaurants } from '../utils/storage';

export default class RestaurantsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
    };
  }

  componentDidMount() {
    listAllRestaurants().then((result) => {
      if (this.state.restaurants.length > 0) return;
      
      this.setState({ restaurants: result });
    })
  }

  render() {
    const { restaurants } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  
          <View style={styles.mainContainer}>
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
                  <View key={key} style={styles.restaurantListItem}>
                    <Text style={styles.restaurantListItemText}>
                      {restaurant.name}
                    </Text>
                  </View>
                )
              })
            )}
          </View>
  
        </ScrollView>
      </View>
    );
  }
}

RestaurantsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 250,
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
    paddingHorizontal: 50,
    textAlign: 'left',
  },
  restaurantListText: {
    paddingBottom: 10,
    fontSize: 22,
    color: '#3F94FF',
  },
  restaurantListItem: {
    marginVertical: 5,
    paddingVertical: 10,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(96,100,109, 0.25)',
    borderWidth: 1,
  },
  restaurantListItemText: {
    paddingHorizontal: 10,
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 22,
  },
});
