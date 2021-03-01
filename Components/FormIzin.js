import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Form,
  Item,
} from 'react-native';
import uuid from 'react-native-uuid';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const FormIzin = () => {
  const [kategori, setKategori] = useState('');
  const [date, setDate] = useState('');
  const [dates, setDates] = useState('');
  const [hal, setHal] = useState('');
  const [ket, setKet] = useState('');
  const [ImageUri, setImageUri] = useState();
  const [fileExtension, setExtension] = useState();

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
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setImageUri(response.uri);
      setExtension(response.uri.split('.').pop());
    });
  };

  // Untuk Ambil Gambar Dari File di HP
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
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
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setImageUri(response.uri);
      setExtension(response.uri.split('.').pop());
    });
  };

  const sendData = () => {
    const uniqId = uuid.v4();
    const id = uniqId.toUpperCase();
    const fileName = `foto-${kategori}.${fileExtension}`;
    console.log(fileName);
    const currentDate = new Date();
    const tanggal = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()} ${(
      '0' + currentDate.getHours()
    ).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${(
      '0' + currentDate.getSeconds()
    ).slice(-2)}`;
    if (ImageUri) {
      // Upload File Ke firebase storage
      const storageRef = storage().ref(`images/${fileName}`);
      storageRef.putFile(`${ImageUri}`).on(
        storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log('snapshot: ' + snapshot.state);
          console.log(
            'progress: ' +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          if (snapshot.state === storage.TaskState.SUCCESS) {
            console.log('Success');
          }
        },
        (error) => {
          console.log('image upload error: ' + error.toString());
        },
        () => {
          // Untuk mendapatkan url dari file yang kita upload
          storageRef.getDownloadURL().then((downloadUrl) => {
            console.log('File available at: ' + downloadUrl);

            const data = {
              id: id,
              kategori: kategori,
              date: date,
              dates: dates,
              hal: hal,
              ket: ket,
              urlGambar: downloadUrl,
              namaFile: fileName,
            };
            // Menyimpan semua data di firestore
            firestore()
              .collection('izin')
              .doc(id)
              .set(data)
              .then(() => {
                setKategori('');
                setDate('');
                setDates('');
                setHal('');
                setKet();
              })
              .catch((error) => {
                alert(error);
              });
          });
        },
      );
    }
  };

  {
    /* <Item>
          <View>
            <Text style={styles.label}>Izin</Text>
            <RNPickerSelect
              selectedValue={kategori}
              onValueChange={(value) => setKategori(value)}
              items={[
                {label: 'Sakit', value: 'Sakit'},
                {label: 'Anak Sakit', value: 'Anak Sakit'},
                {label: 'Bencana', value: 'Bencana'},
              ]}
            />
          </View>
        </Item> */
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Text style={styles.label}>kategori</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setKategori(text)}
            value={kategori}
            placeholder="Masukan kategori"
          />
        </View>
        <View>
          <Text style={styles.label}>Dari Tanggal</Text>
          <DatePicker
            style={{width: 200}}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2050-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>

        <View>
          <Text style={styles.label}>Sampai Tanggal</Text>
          <DatePicker
            style={{width: 200}}
            date={dates}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2050-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(dates) => {
              setDates(dates);
            }}
          />
        </View>

        <View>
          <Text style={styles.label}>perihal</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setHal(text)}
            value={hal}
            placeholder="Masukan perihal"
          />
        </View>
        <View>
          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setKet(text)}
            value={ket}
            placeholder="Masukan Keterangan"
          />
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.tombol2}
            onPress={() => captureImage('photo')}>
            <Text style={styles.textTombol}>Buka Kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.tombol2}
            onPress={() => chooseFile('photo')}>
            <Text style={styles.textTombol}>Pilih File</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.tombol} onPress={sendData}>
          <Text style={styles.textTombol}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  tombol: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tombol2: {
    alignSelf: 'flex-end',
    height: 50,
    width: 175,
    backgroundColor: 'black',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textTombol: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageStyle: {
    width: 175,
    height: 175,
    marginVertical: 5,
    marginHorizontal: 5,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 85.5,
    borderColor: 'gray',
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
  },
});
export default FormIzin;
