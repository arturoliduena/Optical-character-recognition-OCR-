
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Geolocation from './src/components/Geolocation';
import Maps from './src/components/Maps';
import Camera from './src/components/Camera';
import Gallery from './src/components/Gallery';
import SinglePhoto from './src/components/SinglePhoto';
import Menu from './src/components/Menu';

//export const host = 'http://172.130.0.11:3000';

const mobile = StackNavigator({
  Home: { screen: Menu },
  Geolocation: { screen: Geolocation },
  Maps: { screen: Maps },
  Camera: { screen: Camera },
  Gallery: { screen: Gallery },
  SinglePhoto: { screen: SinglePhoto },
});

AppRegistry.registerComponent('mobile', () => mobile);