import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { host } from '../../index.android.js';

export default class Geolocation extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      user: this.props.navigation.state.params.data,
    };
    this.geolocation = this.geolocation.bind(this);
  };

  static navigationOptions = {
    title: 'Geolocation',
  };

  geolocation(){

   navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

  }

  render(){
   return (
      <View style = {styles.container} >
      <Text> Geolocation</Text>
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
      <TouchableOpacity activeOpacity= {0.5} onPress={this.geolocation}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Geolocation</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('PendingTasks', {data: this.state.user})}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>PendingTasks</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('Maps')}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Maps</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('Gallery')}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Gallery</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity= {0.5} onPress={() => this.props.navigation.navigate('Camera')}>
            <View style= {styles.button}>
              <Text style= {styles.buttonText}>Camera</Text>
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
   backgroundColor: '#f7b733',
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