import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, CameraRoll, Image, ScrollView, TouchableHighlight, Alert, NativeModules, ToastAndroid } from 'react-native';
import { host } from '../../index.android.js';
import ImageResizer from 'react-native-image-resizer';
import Spinner from 'react-native-spinkit';
import { StackNavigator, NavigationActions } from 'react-navigation';

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
      loading: false,
      textArray: [],
      err: null,
    };
    this.send = this.send.bind(this);
    this.changeStylePhoto = this.changeStylePhoto.bind(this);
    this.sure = this.sure.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.text = this.text.bind(this);
    this.goHome = this.goHome.bind(this);
    this.back = this.back.bind(this);
  };

  static navigationOptions = {
    title: 'SinglePhoto',
  };

componentWillMount(){
  this.setState({
      loading: true
  });
}


  render(){
    console.log('loading',this.state.loading)
   return (
    <View style={styles.container}>
      <View style={this.state.selectedPhoto?styles.containerMax:styles.containerMin}>
      <TouchableOpacity
        style={this.state.selectedPhoto?styles.containerMax:styles.containerMin}
        onPress={this.changeStylePhoto}
      >
        <Image style={this.state.selectedPhoto?styles.photoMax:styles.photoMin} source={{ uri: this.props.navigation.state.params.data.mediaUri }} >

        {(!this.state.loading)?
          <View/>:
          <View>
            <Spinner
              style={styles.spinner}
              isVisible={true}
              size={400}
              type={'Pulse'}
              color={'white'}/>
          </View>
        }

        </Image>
      </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {this.text()}
      </ScrollView>
      
      <TouchableOpacity
          style={styles.Button}
          onPress={this.goHome}
//          onPress={this.props.navigation.navigate('Home')}
      >
        <Image
            style={styles.icon}
            source={require('../assets/icon_send.png')}
        />
      </TouchableOpacity>
    </View>

   )
  }

  goHome(){
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'})
    ]
  })
  this.props.navigation.dispatch(resetAction)
  }

  back() {
  const backAction = NavigationActions.back({
    key: null
  })
  this.props.navigation.dispatch(backAction)
    
  }

  componentDidMount(){
    resizeImage(this.props.navigation.state.params.data.path, (resizedImageUri) => {
      NativeModules.RNImageToBase64.getBase64String(resizedImageUri, async (err, base64) => {
        // Do something with the base64 string
        if (err) {
          console.error(err)
        }
        console.log('converted to base64');
        // ToastAndroid.show('converted to base64', ToastAndroid.SHORT);
        let result = await checkForTextDetection(base64);
        console.log(result);
        let textArray;
        console.log('textArray', textArray);
        console.log('new textArray', Array.isArray(result.responses[0].textAnnotations))
        if(Array.isArray(result.responses[0].textAnnotations)){
        textArray = result.responses[0].textAnnotations.map(elem => elem.description)
        }
        // ToastAndroid.show(JSON.stringify(result), ToastAndroid.SHORT);

        this.setState({
          loading: false, textArray: textArray 
        })
      })

    })
//    .catch(err => console.error(err));

  }

  text(){
    console.log('state', this.state)
    if(this.state.loading) return <View><Text>loading text ...</Text></View>
    else if(this.state.textArray){
      return(
        <View>
          <Text style={{backgroundColor: '#3498DB'}}>text Complete</Text>
          <Text style={{backgroundColor: 'white'}} >{this.state.textArray[0]}</Text>
          <Text style={{backgroundColor: '#3498DB'}}>each word</Text>
          {this.state.textArray.filter((a,i) => i !== 0).map((elem, i) => <Text key={i} style={{backgroundColor: 'white'}}>- {elem}</Text>)}
        </View>
      )
    }
    else {
     Alert.alert(
      'Not found',
      'text not found, take photo again' ,
      [
        {
          text: 'Accept',
          onPress: (this.back)
        },
        {
          text: 'Cancel',
          onPress: (this.cancelar)
        }
      ]
      )
    }

  }

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

}


// according to https://cloud.google.com/vision/docs/supported-files, recommended image size for text detection is 1024x768
function resizeImage(path, callback, width = 1024, height = 768) {
  ImageResizer.createResizedImage(path, width, height, 'JPEG', 100).then((resizedImageUri) => {
    callback(resizedImageUri);

  }).catch((err) => {
    console.error(err)
  });
}

// API call to google cloud
async function checkForTextDetection(base64) {

return await
  fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBcX1IYn6jGU-mTOLoRXT03slD20ZJjgak', {
    method: 'POST',
    body: JSON.stringify({
      "requests": [
        {
          "image": {
            "content": base64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
  }).then((response) => {
    console.log('response', response)
    return response.json();
  }, (err) => {
    console.error('promise rejected')
    console.error(err)
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMin: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    alignItems: 'center'
  },
  containerMax: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  photoMin: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoMax: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button: {
    padding: 10,
    borderRadius: 40,
    width: 60,
  },
    icon: {
      width: 40,
      height: 40,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    margin: 50,
    height: 70,
    width: 70,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 15
  },
  spinner: {
    marginBottom: 50
  },
});

