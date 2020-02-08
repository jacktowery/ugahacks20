import React, { Component } from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

Header.defaultProps = {
  title: 'MEAL'
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue'
  },
  text: {
      color: '#ffffff',
      fontSize: 23,
      textAlign: 'center'
  }

})

export default Header;