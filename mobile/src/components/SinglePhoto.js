import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, CameraRoll, Image, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { host } from '../../index.android.js';

export default class SinglePhoto extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: '',
      images: [],
      uri: '',
      selectedPhoto: false,
      user: this.props.navigation.state.params.user,
      task: this.props.navigation.state.params.task,
    };
    this.send = this.send.bind(this);
    this.changeStylePhoto = this.changeStylePhoto.bind(this);
    this.sure = this.sure.bind(this);
    this.cancelar = this.cancelar.bind(this);
  };

  static navigationOptions = {
    title: 'SinglePhoto',
  };


  send(){

    let uriFromCameraRoll = this.props.navigation.state.params.data.mediaUri; 

    let photo = {
      uri: uriFromCameraRoll,
      type: 'image/jpeg',
      name: `Agent_ID${this.state.task.agent.id}_task_ID${this.state.task.id}.jpg`,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var PhotoData = new FormData();
        PhotoData.append('photo', photo);
        PhotoData.append('title', 'photo prisma!');
        PhotoData.append('id_task', this.state.task.id);
        PhotoData.append('id_user', this.state.user.agent.id);
        PhotoData.append('latitud', position.coords.latitude);
        PhotoData.append('longitud', position.coords.longitude)

        fetch(`${host}/profile`,{
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: PhotoData
          }).then(response => {
            this.props.navigation.navigate('PendingTasks', {user: this.state.user})
          }).catch(err => {
            console.log(err)
          })  
      },
      (error) => {

          Alert.alert(
        'Error',
        'Error de localizacion, revise la configuracion de de servicios de ubicacion' ,
        [
          {
            text: 'Aceptar',
            onPress: (this.send)
          },
          {
            text: 'Cancelar',
            onPress: (this.cancelar)
          }
        ]
        )
      },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      );




  }

  changeStylePhoto(){
   this.setState({
    selectedPhoto: this.state.selectedPhoto?false:true
   }) 
  }

  sure() {
    Alert.alert(
      'Enviar',
      'esta seguro de enviar la respuesta: Foto' ,
      [
        {
          text: 'Aceptar',
          onPress: (this.send)
        },
        {
          text: 'Cancelar',
          onPress: (this.cancelar)
        }
      ]
      )
  }

  cancelar() {
    console.log('cancelar');
  }


  render(){
   return (
      <View style={this.state.selectedPhoto?styles.containerMax:styles.containerMin}>
      <TouchableOpacity
        style={this.state.selectedPhoto?styles.containerMax:styles.containerMin}
        onPress={this.changeStylePhoto}
      >
        <Image style={this.state.selectedPhoto?styles.photoMax:styles.photoMin} source={{ uri: this.props.navigation.state.params.data.mediaUri }} >

        </Image>

        <TouchableOpacity
            style={styles.Button}
            onPress={this.sure}
        >
          <Image
              style={styles.icon}
              source={require('../assets/icon_send.png')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      </View>

   )
  }

}


const styles = StyleSheet.create({
    containerMin: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      alignItems: 'center',
    },
    containerMax: {
      backgroundColor: '#F5FCFF',
      flex: 1,
    },
    photoMin: {
      width: 150,
      height: 150,
    },
    photoMax: {
      flex: 1,
    },
    Button: {
      padding: 10,
      borderRadius: 40,
      width: 60,
  },
    icon: {
      width: 40,
      height: 40,
    }
});

