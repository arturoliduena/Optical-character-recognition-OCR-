import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { host } from '../../index.android.js';
import MapView, { Marker } from 'react-native-maps';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      },
      latitude: null,
      longitude: null,
      error: null,
      location: false,
      stores: null,
    };
  };

componentWillMount(){
  fetch(`${host}/store`, {
    credentials: 'include',
   })
      .then(response => response.json())
      .then(data => {
        this.setState({
        stores: data
      })

      }).catch(err => (console.log(err)))

navigator.geolocation.getCurrentPosition(
  (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      region: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      error: null,
      location: true,
    })
  },
  (error) => this.setState({ error: error.message }),
  { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
);

}

  render() {
    if (!this.state.location || !this.state.stores) 
      return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
        <Image
          style={{width: 150, height: 150}}
          source={{uri: 'https://i.stack.imgur.com/E5qkx.gif'}}
        />
        </View>
        )
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
        >
          <Marker
          coordinate={{latitude: this.state.latitude ,longitude: this.state.longitude}}
          title='You are here'
          />

          {this.state.stores.map((store, i ) =>
              <Marker key={i}
              coordinate={{latitude: store.latitud ,longitude: store.longitud}}
              title={store.nombre}
              />             
            )}

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  spinner: {
    width: 100,
    height: 100,
  }
});