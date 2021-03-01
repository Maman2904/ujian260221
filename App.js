import React from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import CekIn from './Components/CekIn';
import CekOut from './Components/CekOut';
import Izin from './Components/FormIzin';
import Laporan from './Components/Laporan';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const StackDash = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <StackDash.Navigator initialRouteName="Dashboard">
      <StackDash.Screen name="Dashboard" component={Dashboard} />
      <StackDash.Screen name="CekIn" component={CekIn} />
      <StackDash.Screen name="CekOut" component={CekOut} />
      <StackDash.Screen name="Izin" component={Izin} />
    </StackDash.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import React, {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   useEffect(() => {
//     firestore()
//       .collection('user')
//       .get()
//       .then((querySnapshot) => {
//         console.log('Total users: ', querySnapshot.size);

//         querySnapshot.forEach((documentSnapshot) => {
//           console.log(
//             'User ID: ',
//             documentSnapshot.id,
//             documentSnapshot.data(),
//           );
//         });
//       });
//   });

//   return (
//     <View>
//       <Text>gggd</Text>
//     </View>
//   );
// };

// export default App;
