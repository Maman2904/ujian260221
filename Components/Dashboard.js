import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.cantainer}>
      <Text style={styles.headerTxt}>WELCOME</Text>
      <View style={styles.subView}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.push('CekIn')}>
          <Text style={styles.btnTxt}>Check In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.push('CekOut')}>
          <Text style={styles.btnTxt}>Check out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.push('Izin')}>
          <Text style={styles.btnTxt}>Izin</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.push('Laporan')}>
          <Text style={styles.btnTxt}>History Absen</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.push('Login')}>
          <Text style={styles.btnTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: '#521be3',
    height: 700,
  },
  subView: {
    backgroundColor: 'white',
    height: 430,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: 140,
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 350,
    backgroundColor: 'blue',
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 35,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  endView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTxt: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 40,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 17,
  },
});

export default Dashboard;
