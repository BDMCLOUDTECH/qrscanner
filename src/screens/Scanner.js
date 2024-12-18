import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RNCamera} from 'react-native-camera';
import Otpverify from '../Components/Otpverify';

const Scanner = ({navigation}) => {
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [nextScreen, setNextScreen] = useState(false);
  const [companyDetail, setCompanyDetail] = useState(null); // Initialize with null

  const fetchGetUrl = async url => {
    var responseClone; // 1
    // console.log('the url received', url);
    const data = {
      username: 'admin',
      password: 'admin',
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
      if (response.status === 200) {
        if (json.data.general_pass == true) {
          if (
            json.data.number_of_person_left == 0 &&
            json.data.member_food_count_left == 0
            // && json.data.member_gift_count_left == 0
          ) {
            setCompanyDetail(null);
            setNextScreen(false);
            Alert.alert(
              'Invalid General Pass QR',
              'The QR code you scanned is not valid for entry.',
            );
          } else {
            setNextScreen(false);
            setCompanyDetail(json);
          }
        } else {
          if (
            (json.data.number_of_person_left == 0 &&
              json.data.member_food_count_left == 0 &&
              // json.data.member_gift_count_left == 0 &&
              json.data.refund_member_count == 0) ||
            (json.data.number_of_person_left == 0 &&
              json.data.member_food_count_left == 0 &&
              // json.data.member_gift_count_left == 0 &&
              json.data.refund_member_count == 1 &&
              checkNoMember(json.data.person_name))
          ) {
            setCompanyDetail(null);
            setNextScreen(false);
            Alert.alert(
              'QR Code Invalid',
              'The QR code you scanned is not valid for entry. It appears that the maximum person limit for this pass has been reached. Please make sure you have the correct pass and try again later.',
            );
          } else if (
            json.data.number_of_person_left == 0 &&
            json.data.member_food_count_left == 0 &&
            // json.data.member_gift_count_left == 0 &&
            json.data.refund_member_count == 1 &&
            json.data.pass_president
          ) {
            Alert.alert(
              'QR Code Invalid',
              'The QR code you scanned is not valid for entry. It appears that the maximum person limit for this pass has been reached. Please make sure you have the correct pass and try again later.',
            );
            setNextScreen(false);
            return;
          } else {
            setNextScreen(false);
            setCompanyDetail(json);
          }
        }
      } else if (response.status === 400) {
        // Person count is already at 0
        setNextScreen(false);
        const errorJson = await response.json();
        Alert.alert('Error', errorJson.message);
      } else {
        // Handle other HTTP error statuses here
        setNextScreen(false);
        Alert.alert(
          'Invalid QR',
          'The QR code you scanned is not valid for entry. Please recheck before scan.',
        );
      }
    } catch (error) {
      console.log(error);
      setNextScreen(false);
      Alert.alert(
        'Invalid QR',
        'Kindly avoid scanning QR codes that are not associated with the company. Please! Try to Scan Only Company QR.',
      );

      // console.error('Catch Outside Error:', error);
    }
  };

  // const fetchGetUrl = async url => {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  //     const data = await res.json();

  //     if (data[0].personLeft == 0) {
  //       Alert.alert(
  //         'QR Code Invalid',
  //         'The QR code you scanned is not valid for entry. It appears that the maximum person limit for this pass has been reached. Please make sure you have the correct pass and try again later.',
  //       );
  //       setCompanyDetail(null);
  //     } else {
  //       setCompanyDetail(data);
  //     }
  //   } catch (error) {p
  //     console.error('An error occurred during fetch:', error);
  //     Alert.alert('Error', 'Failed to fetch company data');
  //   }
  // };

  const onSuccess = async e => {
    setNextScreen(true);

    try {
      console.log('the fetch url is', e.data);
      await fetchGetUrl(e.data);
    } catch (error) {
      console.error('An error occurred', error);
      Alert.alert('Error', 'Failed to fetch company data');
    }
  };

  useEffect(() => {
    // Check if companyDetail is set and has changed
    console.log('Company Detail =>>', companyDetail);
    if (companyDetail !== null && companyDetail !== undefined) {
      navigation.navigate('ScanDetail', {
        companyData: companyDetail,
      });
    }
  }, [companyDetail]);

  const toggleFlash = () => {
    setFlashMode(prevFlashMode =>
      prevFlashMode === RNCamera.Constants.FlashMode.torch
        ? RNCamera.Constants.FlashMode.off
        : RNCamera.Constants.FlashMode.torch,
    );
  };
  const checkNoMember = personString => {
    // Check if 'personString' exists
    if (personString) {
      // Normalize the string: trim spaces and convert to lowercase
      const normalizedPersonName = personString.toLowerCase().trim();

      // Check for 'no member' or 'no main member'
      if (
        normalizedPersonName.includes('no member') ||
        normalizedPersonName.includes('no main member')
      ) {
        return true;
      }
    }
    return false;
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

export default Scanner;
