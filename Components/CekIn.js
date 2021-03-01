import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import storage from '@react-native-firebase/storage';

const CekIn = () => {
  const [ImageUri, setImageUri] = useState();
  const [fileExtension, setExtension] = useState();
  const [koordinat, setKoordinat] = useState('');
  const [Longitude, setLongitude] = useState(0);
  const [Latitude, setLatitude] = useState(0);
  const [ok, setOk] = useState('silahkan absen');

  useEffect(() => {
    getLocation();

    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);
          // If Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else {
        return true;
      }
    };
    return () => {
      requestPermission();
    };
  }, []);

  const saveImage = () => {
    getMyLocation();
    const namefile = `${new Date()}`;

    const reference = storage().ref(namefile);

    const pathToFile = ImageUri;
    // uploads file
    reference.putFile(pathToFile).then(() => {
      console.log('Uploaded');
      storage()
        .ref(namefile)
        .getDownloadURL()
        .then((downloadData) => {
          console.log(downloadData);
          console.log(namefile);
          alert('Done!!!');
        });
    });
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position)
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };

  const getMyLocation = () => {
    setKoordinat(`${Longitude}, ${Latitude}`);
  };

  const captureImage = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }
      setImageUri(response.uri);
      setExtension(response.uri.split('.').pop());
      saveImage();
    });
  };

  return (
    <View style={styles.cantainer}>
      <Text style={styles.headerTxt}>Check In dengan selfie</Text>
      <View style={styles.subView}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => captureImage('photo')}>
          <Text style={styles.btnTxt}>Check</Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => setKoordinat(text)}
          value={koordinat}
          style={{marginTop: 20, marginLeft: 150}}
          placeholder="silahkan tekan check"
        />
        <TextInput
          onChangeText={(text) => setKoordinat(text)}
          value={koordinat}
          style={{marginTop: 240, marginLeft: 160}}
          placeholder="Koordinat Lokasi"
        />
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

export default CekIn;
