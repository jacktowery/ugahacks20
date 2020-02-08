import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons/Ionicons'

const colorMain = '#47cc76';
const colorSecondary = '#287543';
const textColorMain = '#fff';
const textColorSecondary = '#202542'

function HomeScreen({navigation}) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homePreTitle}>Presenting</Text>
      <Text style={styles.homeTitle}>MEAL</Text>
      <Text style={styles.homeSubtitle}>Making Eating Accessible Locally</Text>
      <Text style={styles.homePreTitle}>[[IMAGE]]</Text>
      <Text style={styles.homeInfo}>App description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
      <Text style={styles.homeCopyright}>Copyright Jack Towery 2020</Text>
    </View>
  );
}

function LocateScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Locate Screen</Text>
    </View>
  );
}

function HealthScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Health Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            /*
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Locate') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Nutrition') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            */
            // You can return any component that you like here!
            return <Text>Icon</Text>;
            
          },
        })}
        tabBarOptions={{
          activeTintColor: colorMain,
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Locate" component={LocateScreen} options={{title: 'Locate'}} />
        <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Home',}} />
        <Tab.Screen name="Health" component={HealthScreen} options={{title: 'Nutrition'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hasTextWhite: {
    color: '#fff'
  },
  homeContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: colorMain,
    padding: 20
  },
  homePreTitle: {
    color: colorSecondary
  },
  homeTitle: {
    color: textColorMain,
    fontSize: 50,
    fontWeight: 'bold'
  },
  homeSubtitle: {
    marginTop: -10,
    color: textColorMain,
    fontSize: 20,
  },
  homeInfo: {
    marginTop: 10,
    color: textColorSecondary
  },
  homeCopyright: {
    marginTop: 50,
    color: colorSecondary
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