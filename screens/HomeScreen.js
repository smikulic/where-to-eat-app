import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { listAllRestaurants } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.handlePickRestaurant = this.handlePickRestaurant.bind(this);
    
    this.state = {
      restaurants: [],
      restaurantPicked: '',
      noRestaurants: false,
    }
  }

  handlePickRestaurant = async () => {
    try {
      const readableRestaurants = await listAllRestaurants();
      if (readableRestaurants.length > 0) {
        const randomRestaurant = readableRestaurants[Math.floor(Math.random() * readableRestaurants.length)].name;
        this.setState({ restaurantPicked: randomRestaurant, noRestaurants: false });
      } else {
        this.setState({ noRestaurants: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { restaurantPicked, noRestaurants } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >

          <View style={styles.mainContainer}>
            <Text style={styles.mainContainerTextSecondary}>
              {/* Last place I ate was
              <Text style={styles.mainContainerTextDynamic}> Kapuciner</Text> */}
            </Text>
            <Text style={styles.mainContainerText}>Where should I eat now?</Text>

            { !!restaurantPicked && (
              <View>                
                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={this.handlePickRestaurant}
                >
                  <Text style={styles.buttonText}>
                    Pick again &nbsp;
                    <Ionicons
                      name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
                      size={26}
                      style={{ marginLeft: 15 }}
                      color='#fff'
                    />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.prominentText}>
                  {restaurantPicked}
                </Text>
              </View>
            )}
            { !restaurantPicked && (
              <TouchableOpacity
                style={styles.button}
                onPress={this.handlePickRestaurant}
              >
                <Text style={styles.buttonText}>PICK</Text>
              </TouchableOpacity>
            )}
            { noRestaurants && (
              <Text style={styles.mainContainerTextSecondary}>
                You don't have any restaurants added. Add a few so that we can pick one for you :)
              </Text>
            )}
          </View>

        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },
  mainContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  mainContainerText: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 40,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 40,
    textAlign: 'center',
  },
  mainContainerTextSecondary: {
    marginTop: 10,
    marginBottom: 90,
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 26,
    textAlign: 'left',
  },
  mainContainerTextDynamic: {
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 26,
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 75,
    marginVertical: 25,
    borderRadius: 30,
    backgroundColor: '#3F94FF',
  },
  buttonSecondary: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 55,
    marginVertical: 30,
    borderRadius: 30,
    backgroundColor: '#f2800a',
  },
  buttonText: {
    fontSize: 26,
    color: '#fff',
    lineHeight: 26,
    textAlign: 'center',
  },
  prominentText: {
    marginVertical: 50,
    fontSize: 40,
    color: '#3F94FF',
    lineHeight: 40,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
