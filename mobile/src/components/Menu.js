import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, NetInfo} from 'react-native';
import { host } from '../../index.android.js';

export default class Menu extends Component { 
  constructor(props) {
    super(props);
  };

  static navigationOptions = {
    title: 'Menu',
  };

  render(){
   return (
      <View style = {styles.container} >
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('Camera')}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Camera</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('Gallery')}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Gallery</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('Maps')}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Maps</Text>
            </View>
      </TouchableOpacity>
     </View>
   )
  }
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 button: {
   backgroundColor: '#3498DB',
   paddingVertical: 15,
   marginVertical: 15,
   alignItems: "center",
   justifyContent: "center",
 },
 buttonText: {
   color: '#FFF',
   fontSize: 18,
 }
})