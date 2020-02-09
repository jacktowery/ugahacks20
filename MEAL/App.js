import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, SafeAreaView, FlatList, useState, TouchableOpacity, TextInput, Alert, Linking} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListItem from './components/ListItem';
import GetLocation from 'react-native-get-location';
import { Button, ThemeProvider } from 'react-native-elements'

const brandColorMain = '#3d7829';
const brandColorDark = '#123d12';
const brandColorLight = '#69ad45';
const white = '#fff';

const sfsp19 = require('./assets/data/GA.json');
const farms = require('./assets/data/GAFarms.json');

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={styles.homeContainer}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <Text style={styles.homePreTitle}>Presenting</Text>
        <Text style={styles.homeTitle}>MEAL</Text>
        <Text style={styles.homeSubtitle}>Making Eating Accessible Locally</Text>
        <Image source={require('./assets/images/Byte_Garden.png')} style={styles.homeImage} />
        <Text style={styles.homeInfo}>A critical issue facing our society today is access to nutritious foods. As food deserts become more prevalent and the cost of living rises, obtaining healthy meals becomes harder for Georgia students and families. MEAL aims to help counteract this problem by providing users with resources to locate nutritious and accessible food in their community. Students who are on Free and Reduced Lunch programs can use the locator to find organizations providing lunches when schools are closed, and families can use the Farmers Market Registry to locate local farmers markets and see if they accept SNAP.</Text>
        <Text style={styles.homeInfo}>MEAL was created at UGAHacks 5, a 36-hour hackathon competition at the University of Georgia, by Jack Towery.</Text>
        <Text style={styles.homeCopyright}>© Jack Towery 2020</Text>
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
        <Image source={require('./assets/images/Byte_Lunch.png')} style={styles.homeImage} />
        <Text style={styles.siteSectionHeader}>Enter a Zip Code to search for sites</Text>

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

function LocationItem({index,item,zip,navigation,distance}) {
  //console.log("i="+index);

  if(item.siteZip == zip) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => {
        navigation.navigate('LocateDetails',{item: item}); }} >
        <View style={styles.listItemView}>
            <Text style={styles.listItemLocation}>{item.siteName}</Text>
            <Text style={styles.listItemAddress}>{item.siteAddress}</Text>
            <Text style={styles.listItemDistance}>{distance} miles from your location</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
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
        <FlatList data={sfsp19} renderItem={({item,index}) => <LocationItem index={index} item={item} zip={zip} navigation={navigation} distance={calcualteDistance(currentLat,currentLon,item.lat,item.long)} />} keyExtractor={(item, index) => item.objectID}
         initialNumToRender={1000}/>
      </View>
    </SafeAreaView>
  );
}

function LocateDetailsScreen({route, navigation}) {
  const { item } = route.params;
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <Text style={styles.siteIcon}><Icon name={'map-marker-alt'} size={30} color={brandColorDark} /></Text>
        <Text style={styles.siteTitle}>{item.siteName}</Text>
        <Text style={styles.siteSubtitle}>{item.sponsoringOrganization}</Text>
        <View style={styles.siteAddressContainer}>
          <Text style={styles.siteAddress}>{item.siteAddress}</Text>
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>Days of Operation:</Text>
          <Text style={styles.siteDays}>{item.daysofOperation}</Text>
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>Meal Times:</Text>
          {item.mealTypesServed.includes('B') ? <Text style={styles.siteMealTime}>Breakfast: {item.breakfastTime}</Text> : null}
          {item.mealTypesServed.includes('A') ? <Text style={styles.siteMealTime}>AM Snack: {item.snackTimeAM}</Text> : null}
          {item.mealTypesServed.includes('L') ? <Text style={styles.siteMealTime}>Lunch: {item.lunchTime}</Text> : null}
          {item.mealTypesServed.includes('P') ? <Text style={styles.siteMealTime}>PM Snack: {item.snackTimePM}</Text> : null}
          {item.mealTypesServed.includes('D') ? <Text style={styles.siteMealTime}>Dinner: {item.dinnerSupperTime}</Text> : null}
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>Active Dates:</Text>
          <Text style={styles.siteActiveDays}>{item.startDate}</Text>
          <Text style={styles.siteAddress}>through</Text>
          <Text style={styles.siteActiveDays}>{item.endDate}</Text>
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>Questions? Contact:</Text>
          <Text style={styles.siteContactName}>{item.contactFirstName} {item.contactLastName}</Text>
          <Text style={styles.siteContact}>{item.sitePhone}</Text>
        </View>
        <View style={styles.siteSectionContainer}>
          <Button title='Directions' color={brandColorLight} onPress={() => { Linking.openURL('http://www.google.com/maps/place/' + item.lat + ',' + item.long)}}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

function LocationItem2({index,item,navigation,distance}) {
  //console.log("i="+index);
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => {
      navigation.navigate('FarmDetails',{item: item}); }} >
      <View style={styles.listItemView}>
          <Text style={styles.listItemLocation}>{item.MarketName}</Text>
          <Text style={styles.listItemAddress}>{item.street}, {item.city}, GA {item.zip}</Text>
          <Text style={styles.listItemDistance}>{distance} miles from your location</Text>
          {item.SNAP == "Y" ? <Text style={styles.yesSNAP}>Accepts SNAP</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

function FarmsStartScreen({navigation}) {
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
        <FlatList data={farms} renderItem={({item,index}) => <LocationItem2 index={index} item={item} navigation={navigation} distance={calcualteDistance(currentLat,currentLon,item.lat,item.long)} />} keyExtractor={(item, index) => item.objectID}
         initialNumToRender={20}/>
      </View>
    </SafeAreaView>
  );
}

function FarmDetailsScreen({route, navigation}) {
  const { item } = route.params;
  return (
    <SafeAreaView style={{backgroundColor: brandColorMain, flex: 1}} >
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <StatusBar backgroundColor={brandColorMain} barStyle="light-content" />
        <Text style={styles.siteIcon}><Icon name={'carrot'} size={30} color={brandColorDark} /></Text>
        <Text style={styles.siteTitle}>{item.MarketName}</Text>
        <Text style={styles.siteSubtitle}>{item.city}, GA</Text>
        <View style={styles.siteAddressContainer}>
          <Text style={styles.siteAddress}>{item.street}, {item.city}, GA {item.zip}</Text>
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>Hours:</Text>
          <Text style={styles.siteDays}>{item.Season1Time}</Text>
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>Featured Goods:</Text>
          <View style={styles.farmGoodsContainer}>
            {item.Organic == "Y" ? <Text style={styles.farmGood}>Organic Foods, </Text> : null}
            {item.Bakedgoods == "Y" ? <Text style={styles.farmGood}>Baked Goods, </Text> : null}
            {item.Cheese == "Y" ? <Text style={styles.farmGood}>Cheeses, </Text> : null}
            {item.Crafts == "Y" ? <Text style={styles.farmGood}>Crafts, </Text> : null}
            {item.Flowers == "Y" ? <Text style={styles.farmGood}>Flowers, </Text> : null}
            {item.Eggs == "Y" ? <Text style={styles.farmGood}>Eggs, </Text> : null}
            {item.Seafood == "Y" ? <Text style={styles.farmGood}>Seafood, </Text> : null}
            {item.Herbs == "Y" ? <Text style={styles.farmGood}>Herbs, </Text> : null}
            {item.Vegetables == "Y" ? <Text style={styles.farmGood}>Vegetables, </Text> : null}
            {item.Honey == "Y" ? <Text style={styles.farmGood}>Honey, </Text> : null}
            {item.Jams == "Y" ? <Text style={styles.farmGood}>Jams, </Text> : null}
            {item.Maple == "Y" ? <Text style={styles.farmGood}>Maple, </Text> : null}
            {item.Meat == "Y" ? <Text style={styles.farmGood}>Meats, </Text> : null}
            {item.Nursery == "Y" ? <Text style={styles.farmGood}>Plant Nursery, </Text> : null}
            {item.Nuts == "Y" ? <Text style={styles.farmGood}>Nuts, </Text> : null}
            {item.Plants == "Y" ? <Text style={styles.farmGood}>Plants, </Text> : null}
            {item.Poultry == "Y" ? <Text style={styles.farmGood}>Poultry, </Text> : null}
            {item.Prepared == "Y" ? <Text style={styles.farmGood}>Prepared Foods, </Text> : null}
            {item.Soap == "Y" ? <Text style={styles.farmGood}>Soap, </Text> : null}
            {item.Trees == "Y" ? <Text style={styles.farmGood}>Trees & Saplings, </Text> : null}
            {item.Wine == "Y" ? <Text style={styles.farmGood}>Wine, </Text> : null}
            {item.Coffee == "Y" ? <Text style={styles.farmGood}>Coffee, </Text> : null}
            {item.Beans == "Y" ? <Text style={styles.farmGood}>Beans, </Text> : null}
            {item.Fruits == "Y" ? <Text style={styles.farmGood}>Fruits, </Text> : null}
            {item.Grains == "Y" ? <Text style={styles.farmGood}>Grains, </Text> : null}
            {item.Juices == "Y" ? <Text style={styles.farmGood}>Juices, </Text> : null}
            {item.Mushrooms == "Y" ? <Text style={styles.farmGood}>Mushrooms, </Text> : null}
            {item.PetFood == "Y" ? <Text style={styles.farmGood}>Pet Food, </Text> : null}
            {item.Tofu == "Y" ? <Text style={styles.farmGood}>Tofu, </Text> : null}
            {item.WildHarvested == "Y" ? <Text style={styles.farmGood}>Wild-Harvested Foods, </Text> : null}
          </View>
        </View>
        <View style={styles.siteSectionContainer}>
          <Text style={styles.siteSectionHeader}>More Information</Text>
          {item.Website != "" ? <Button title='Website' color={brandColorLight} style={styles.buttonStyle1} onPress={() => { Linking.openURL(item.Website)}}/> : null}
          {item.Facebook != "" ? <Button title='Facebook' color={brandColorLight} style={styles.buttonStyle1} onPress={() => { Linking.openURL(item.Facebook)}}/> : null}
          {item.Twitter != "" ? <Button title='Twitter' color={brandColorLight} style={styles.buttonStyle1} onPress={() => { Linking.openURL(item.Twitter)}}/> : null}
          {item.Youtube != "" ? <Button title='YouTube' color={brandColorLight} style={styles.buttonStyle1} onPress={() => { Linking.openURL(item.Youtube)}}/> : null}
        </View>
        <View style={styles.siteSectionContainer}>
          {item.SNAP == "Y" ? <Text style={styles.yesSNAPbig}>Accepts SNAP</Text> : null}
        </View>
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
      <LocateStack.Screen name="LocateStart" component={LocateStartScreen} options={{title: 'Find a Summer Lunch Site'}} />
      <LocateStack.Screen name="LocateResults" component={LocateResultsScreen} options={{title: 'Search Results'}} />
      <LocateStack.Screen name="LocateDetails" component={LocateDetailsScreen} options={{title: ''}} />
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
      <HealthStack.Screen name="FarmsStart" component={FarmsStartScreen} options={{title: 'Georgia Farmers Markets'}} />
      <HealthStack.Screen name="FarmDetails" component={FarmDetailsScreen} options={{title: ''}}/>
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
    color: brandColorLight,
    marginBottom: -10
  },
  homeTitle: {
    color: white,
    fontSize: 70,
    fontWeight: 'bold',
  },
  homeSubtitle: {
    marginTop: -10,
    color: white,
    fontSize: 20,
  },
  homeInfo: {
    marginTop: 10,
    color: white,
    textAlign: 'center'
  },
  homeCopyright: {
    marginTop: 80,
    color: brandColorLight
  },
  homeImage: {
    height: 200, 
    width: 200,
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
  },
  siteIcon: {
    marginTop: 20,
    marginBottom: 6,
  },
  siteTitle: {
    color: white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  siteSubtitle: {
    color: brandColorDark,
    fontSize: 16
  },
  siteSectionHeader: {
    color: brandColorDark,
    fontSize: 14,
    fontWeight: 'bold'
  }, 
  siteAddress: {
    fontSize: 12,
    color: brandColorDark,
  },
  siteAddressContainer: {
    marginTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  siteSectionContainer: {
    marginTop: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  siteDays: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  siteMealTime: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  siteActiveDays: {
    color: brandColorDark,
    fontSize: 16,
    fontStyle: 'italic'
  },
  siteContact: {
    fontSize: 12,
    color: white,
  },
  siteContactName: {
    fontSize: 12,
    color: white,
    fontWeight: 'bold'
  },
  farmGood: {
    color: white,
    fontSize: 14
  },
  farmGoodsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  buttonStyle1: {
    marginTop: 15,
    marginBottom: 15
  },
  yesSNAP: {
    fontSize: 12,
    fontWeight: 'bold',
    color: brandColorLight
  },
  yesSNAPbig: {
    fontSize: 20,
    fontWeight: 'bold',
    color: brandColorLight
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