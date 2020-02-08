import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, StatusBar, SafeAreaView, FlatList, useState, TouchableOpacity, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListItem from './components/ListItem';
import GetLocation from 'react-native-get-location';

const brandColorMain = '#3d7829';
const brandColorDark = '#123d12';
const brandColorLight = '#69ad45';
const white = '#fff';

const sfsp19 = require('./assets/data/summersites.json');

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={styles.homeContainer}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <Text style={styles.homePreTitle}>Presenting</Text>
        <Text style={styles.homeTitle}>MEAL</Text>
        <Text style={styles.homeSubtitle}>Making Eating Accessible Locally</Text>
        <Image source={require('./assets/images/byte1.png')} style={styles.homeImage} />
        <Text style={styles.homeInfo}>App description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
        <Text style={styles.homeCopyright}>Copyright Jack Towery 2020</Text>
      </View>
    </SafeAreaView>
  );
}

function LocateStartScreen({navigation}) {
  const [zip, onChangeText] = React.useState('');
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <Text>Locate Screen</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputBox1Label}>Zip Code</Text>
          <TextInput
            style={styles.inputBox1}
            onChangeText={text => onChangeText(text)}
            value={zip}
          />
        </View>
        
        <Button title="Submit"
          onPress={() => {
            navigation.navigate('LocateResults', {
              zip: zip
            });
          }}
          />
      </View>
    </SafeAreaView>
  );
}

function calcualteDistance(lat1,lon1,lat2,lon2) {
  lat1 = parseFloat(lat1);
  lat2 = parseFloat(lat2);
  lon1 = parseFloat(lon1);
  lon2 = parseFloat(lon2);
  const R = 6371e3; //meters
  var φ1 = lat1 * (3.14/180);
  var φ2 = lat2 * (3.14/180);
  var Δφ = (lat2-lat1) * (3.14/180);
  var Δλ = (lon2-lon1) * (3.14/180);
  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  var dm = d * 0.000621371; // convert to miles
  return dm;
}

function LocateResultsScreen({route, navigation}) {
  const { zip } = route.params;
  var currentLat = 0;
  var currentLon = 0;

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
      //console.log(location);
      currentLat = location.latitude;
      currentLon = location.longitude
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })


  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <FlatList data={sfsp19} renderItem={({item}) => {
            console.log('about to check');

            if(item.siteZip == zip) {
              return <TouchableOpacity style={styles.listItem} onPress={() => {
                  navigation.navigate('LocateDetails',{
                    long: item.x,
                    lat: item.y,
                    siteName: item.siteName,
                    siteAddress: item.siteAddress,
                    siteCity: item.siteCity,
                    siteState: item.siteState,
                    siteZip: item.sizeZip,
                    sitePhone: item.sitePhone,
                    sponsoringOrganization: item.sponsoringOrganization,
                    daysofOperation: item.daysofOperation,
                    comments: item.comments,
                    breakfastTime: item.breakfastTime,
                    lunchTime: item.lunchTime,
                    snackTimeAM: item.snackTimeAM,
                    snackTimePM: item.snackTimePM,
                    dinnerSupperTime: item.dinnerSupperTime,
                    mealTypesServed: item.mealTypesServed,
                    county: item.county
                    });
                  }} >
                  <View style={styles.listItemView}>
                      <Text style={styles.listItemLocation}>{item.siteName}</Text>
                      <Text style={styles.listItemAddress}>{item.siteAddress}</Text>
                      <Text style={styles.listItemDistance}>{calcualteDistance(currentLat,currentLon,item.y,item.x)} miles from your location</Text>
                  </View>
                </TouchableOpacity>;
            } else {
              console.log('not a match');
            }
        }} keyExtractor={(item, index) => item.objectID}
         />
      </View>
    </SafeAreaView>
  );
}

function LocateDetailsScreen({route, navigation}) {
  const { siteName } = route.params;
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <Text>{siteName}</Text>
      </View>
    </SafeAreaView>
  );
}

function HealthStartScreen({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Heath Screen</Text>
        <Button title="Submit"
          onPress={() => {
            navigation.navigate('HealthResults', {
              itemId: 86,
              param2: 'test text',
            });
          }}
          />
      </View>
    </SafeAreaView>
  );
}

function HealthResultsScreen() {
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Health Results Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              return <Text><Icon name='info-circle' size={size} color={color} /></Text>;
            } else if (route.name === 'Locate') {
              return <Text><Icon name='map-marked-alt' size={size} color={color} /></Text>;
            } else if (route.name === 'Health') {
              return <Text><Icon name='carrot' size={size} color={color} /></Text>;
            }
            // You can return any component that you like here!
            return <Text><Icon name={iconName} size={size} color={color} /></Text>;
            
          },
        })}
        tabBarOptions={{
          activeTintColor: brandColorLight,
          inactiveTintColor: white,
          activeBackgroundColor: brandColorDark,
          inactiveBackgroundColor: brandColorDark,
          showLabel: false,
          style: {
            backgroundColor: brandColorDark,
            borderTopWidth: 0,
            paddingTop: 0
          }
        }}
      >
        <Tab.Screen name="Locate" component={LocateStackScreen} options={{title: 'Locate'}} />
        <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Home',}} />
        <Tab.Screen name="Health" component={HealthStackScreen} options={{title: 'Nutrition'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const LocateStack = createStackNavigator();

function LocateStackScreen() {
  return (
    <LocateStack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: brandColorDark,
          borderWidth: 0,
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          elevation: 0
        },
        headerTintColor: white,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
      <LocateStack.Screen name="LocateStart" component={LocateStartScreen} />
      <LocateStack.Screen name="LocateResults" component={LocateResultsScreen} />
      <LocateStack.Screen name="LocateDetails" component={LocateDetailsScreen} />
    </LocateStack.Navigator>
  )
}

const HealthStack = createStackNavigator();

function HealthStackScreen() {
  return (
    <HealthStack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: brandColorDark,
          borderWidth: 0,
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          elevation: 0,

        },
        headerTintColor: white,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
      <HealthStack.Screen name="HealthStart" component={HealthStartScreen} />
      <HealthStack.Screen name="HealthResults" component={HealthResultsScreen} />
    </HealthStack.Navigator>
  )
}

const styles = StyleSheet.create({
  hasTextWhite: {
    color: '#fff'
  },
  homeContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: brandColorMain,
    padding: 20
  },
  homePreTitle: {
    color: brandColorLight
  },
  homeTitle: {
    color: white,
    fontSize: 50,
    fontWeight: 'bold',
    
  },
  homeSubtitle: {
    marginTop: -10,
    color: white,
    fontSize: 20,
  },
  homeInfo: {
    marginTop: 10,
    color: white
  },
  homeCopyright: {
    marginTop: 50,
    color: brandColorLight
  },
  homeImage: {
    height: 150, 
    width: 136,
    marginTop: 40,
    marginBottom: 40
  },
  listItem: {
    padding: 15,
    backgroundColor: brandColorMain,
    borderBottomWidth: 1,
    borderColor: brandColorLight,
    flex: 1
},
  listItemView: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flex: 1,
  },
  listItemLocation: {
      fontSize: 18,
      fontWeight: 'bold',
      color: white,
  },
  listItemAddress: {
    fontSize: 12,
    fontStyle: 'italic',
    color: brandColorDark
  },
  listItemDistance: {
    fontSize: 12,
    fontWeight: 'bold',
    color: brandColorDark
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  inputBox1: {
    backgroundColor: white,
    color: brandColorDark,
    height: 40,
    borderRadius: 10,
    flex: 1,
    paddingTop: 6,
    paddingRight: 12,
    paddingBottom: 6,
    paddingLeft: 12
  },
  inputBox1Label: {
    color: white,
    marginRight: 20
  }
  
});


export default App;



/*
import React, { Component, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';

const App = () => {
  const [items, setItems] = useState([
    {id: '1', text: 'Milk'},
    {id: '2', text: 'Eggs'},
    {id: '3', text: 'Bread'},
    {id: '4', text: 'Juice'}
  ]);

  return (
    <View style={styles.container}>
      <Header title='MEAL'/>
      <FlatList data={items} renderItem={({item}) => (
        <ListItem item={item} />
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 60,
  },

})

export default App;
*/