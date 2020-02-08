import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons'

const brandColorMain = '#3d7829';
const brandColorDark = '#123d12';
const brandColorLight = '#69ad45';
const white = '#fff';

function HomeScreen({navigation}) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homePreTitle}>Presenting</Text>
      <Text style={styles.homeTitle}>MEAL</Text>
      <Text style={styles.homeSubtitle}>Making Eating Accessible Locally</Text>
      <Image source={require('./assets/images/byte1.png')} style={styles.homeImage} />
      <Text style={styles.homeInfo}>App description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
      <Text style={styles.homeCopyright}>Copyright Jack Towery 2020</Text>
    </View>
  );
}

function LocateStartScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Locate Screen</Text>
      <Button title="Submit"
        onPress={() => {
          navigation.navigate('LocateResults', {
            itemId: 86,
            param2: 'test text',
          });
        }}
        />
    </View>
  );
}

function LocateResultsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Locate Results Screen</Text>
    </View>
  );
}

function HealthStartScreen({navigation}) {
  return (
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
  );
}

function HealthResultsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Health Results Screen</Text>
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
          activeTintColor: brandColorDark,
          inactiveTintColor: 'gray',
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
    <LocateStack.Navigator>
      <LocateStack.Screen name="LocateStart" component={LocateStartScreen} />
      <LocateStack.Screen name="LocateResults" component={LocateResultsScreen} />
    </LocateStack.Navigator>
  )
}

const HealthStack = createStackNavigator();

function HealthStackScreen() {
  return (
    <HealthStack.Navigator>
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