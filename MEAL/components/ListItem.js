import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const ListItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => alert("pressed!")} >
      <View style={styles.listItemView}>
          <Text style={styles.location}>{item.siteName}</Text>
          <Text style={styles.address}>{item.siteAddress}</Text>
          <Text style={styles.hours}>3 miles from your location</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        flex: 1
    },
    listItemView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 1,
    },
    location: {
        fontSize: 18
    },
    address: {
      fontSize: 10
    },
    hours: {
      fontSize: 10,
      fontWeight: 'bold'
    }

})

export default ListItem;