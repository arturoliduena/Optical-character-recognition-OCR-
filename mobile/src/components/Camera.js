import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert, NativeModules, ToastAndroid} from 'react-native';
import Camera from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';
import Spinner from 'react-native-spinkit';

export default class App extends React.Component {
state = {
    loading: false,
};

render() {
console.log('Starting app');
  return (
    <View style={styles.container}>
      <Camera
      ref={(cam) => {
          this.camera = cam;
      }}
      style={styles.preview}
      aspect={Camera.constants.Aspect.fill}
      playSoundOnCapture={false}>
      {
        (!this.state.loading) ?
          <Text
            style={styles.capture}
            onPress={this.takePicture.bind(this)}/>
          :
          <View>
            <Spinner
              style={styles.spinner}
              isVisible={true}
              size={70}
              type={'Bounce'}
              color={'white'}/>
          </View>

          }
      </Camera>
    </View>
  );
}

takePicture() {
  if (!this.state.loading) {
    this.setState({loading: true});

    const options = {};

    this.camera.capture()
      .then((data) => {
        this.setState({loading: false })            
        this.props.navigation.navigate('SinglePhoto', {data: data})
      })
      .catch(err => console.error(err));
                        
  } else {
      console.log('NO GO' + this.state.loading)
  }
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
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
  loadingMsg: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  loadingText: {
    fontSize: 18,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 30
  },
  spinner: {
    marginBottom: 50
  },
});