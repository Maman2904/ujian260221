/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import CekIn from './Components/CekIn';
// import Form from './Components/Notif';
import {name as appName} from './app.json';
// import {Buffer} from 'buffer';
// global.Buffer = Buffer; // very important

AppRegistry.registerComponent(appName, () => App);
