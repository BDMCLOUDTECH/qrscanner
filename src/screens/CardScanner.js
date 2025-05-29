import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardScanner = ({navigation}) => {
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [nextScreen, setNextScreen] = useState(false);
  const fetchGetUrl = async (url, companyId) => {
    var responseClone; // 1
    console.log('the url received', url);
    const data = {
      username: 'admin',
      password: 'admin',
      // member_ship_encrypt_code: 'b0UY',
      member_ship_encrypt_code: companyId,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // console.log('response received is', response);

      responseClone = response.clone();
      // console.log('responseClone', responseClone);
      const json = await response.json();
      console.log('json response: ', json);

      // return;
      if (response.status === 200) {
        if (json) {
          navigation.navigate('CardDetails', {
            data: json,
          });
          setNextScreen(false);
        }
      } else if (response.status === 404) {
        const errorJson = await response.json();
        Alert.alert('Error', errorJson.message);
        navigation.navigate('LaunchScreen');
      } else {
        Alert.alert(
          'Invalid QR',
          'The QR code you scanned is not valid for entry. Please recheck before scan.',
        );
        navigation.navigate('LaunchScreen');
      }
    } catch (error) {
      console.log(error);
      setNextScreen(false);
      Alert.alert(
        'Invalid QR',
        'Kindly avoid scanning QR codes that are not associated with the company. Please! Try to Scan Only Company QR.',
      );
      navigation.navigate('LaunchScreen');
    }
  };

  const onSuccess = async e => {
    setNextScreen(true);

    try {
      console.log('the fetch url using the card url', e.data);
      //sample url
      // https://emacares.emamumbai.com/view_data/aEQbQQ==
      const data = e.data.split('/');
      console.log('data: ', data);
      let fetchEventDataUrl =
        'https://emamumbai.com/api_new/AppController/get_scanner_data';
      await fetchGetUrl(fetchEventDataUrl, data[data.length - 1]);
    } catch (error) {
      console.log('error occured on scanning card is', error);
      console.error('An error occurred', error);
      Alert.alert('Error', 'Failed to fetch company data');
      setNextScreen(false);
      navigation.navigate('LaunchScreen');
    }
  };

  const toggleFlash = () => {
    setFlashMode(prevFlashMode =>
      prevFlashMode === RNCamera.Constants.FlashMode.torch
        ? RNCamera.Constants.FlashMode.off
        : RNCamera.Constants.FlashMode.torch,
    );
  };

  return (
    <>
      {nextScreen ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>Fetching QR Code</Text>
          <ActivityIndicator size={40} />
          {/* <Otpverify /> */}
        </View>
      ) : (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={flashMode}
          showMarker={true}
          reactivate={true}
          reactivateTimeout={2000}
          topContent={
            <Text style={styles.centerText}>
              <Text style={styles.textBold}>Scan QR</Text>
            </Text>
          }
          bottomContent={
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={toggleFlash}>
              {flashMode === RNCamera.Constants.FlashMode.torch ? (
                <Icon
                  name="flashlight-off"
                  style={[styles.buttonText, {backgroundColor: '#DB1E36'}]}
                />
              ) : (
                <Icon
                  name="flashlight-on"
                  style={[styles.buttonText, {backgroundColor: '#379237'}]}
                />
              )}
            </TouchableOpacity>
          }
          bottomViewStyle={styles.bottomContent}
          topViewStyle={styles.topViewStyle}
          cameraContainerStyle={styles.cameraContainerStyle}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centerText: {
    fontSize: 22,
    color: '#777',
    textAlign: 'center',
    marginBottom: 25,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 25,

    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    color: '#ffffff',
  },
  buttonTouchable: {
    alignItems: 'center',
    marginBottom: '10%',
    marginTop: 'auto',
  },
});

export default CardScanner;
