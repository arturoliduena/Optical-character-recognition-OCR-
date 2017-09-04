import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, CameraRoll, Image, ScrollView, TouchableHighlight } from 'react-native';
import { host } from '../../index.android.js';

export default class Gallery extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: '',
      images: [],

    };
    this.storeImages = this.storeImages.bind(this);
  };

  static navigationOptions = {
    title: 'Gallery',
  };


componentDidMount() {
    console.log(this.state)
    CameraRoll.getPhotos({first: 20,
                          assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
    .then(() => console.log(this.state))
  };

  storeImages(data) {
        const assets = data.edges;
        const images = assets.map((asset) => asset.node.image);
        this.setState({
            images: images,
        });
    }


  render(){
   return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
        { this.state.photos.map((image) => {
            return (
                <TouchableHighlight>
                <Image style={styles.image} source={{ uri: image.node.image.uri }} />
                </TouchableHighlight>
            );
            })
        }
        </View>
    </ScrollView>
   )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
    }
});