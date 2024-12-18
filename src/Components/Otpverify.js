import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import {verifyOtpModalStyles} from '../styles/styles';
const Otpverify = ({
  showModal,
  setShowModal,
  setShowOtpSendIndicator,
  booking_id,
}) => {
  const Navigation = useNavigation();

  const [otp, setOtp] = useState('');

  const handleTextChange = text => {
    // console.log(text);

    // Update local state only if the input text is different from the current state
    if (text.length <= 4) {
      setOtp(text);
    }
  };

  const handleFilled = text => {
    // console.log(`OTP is ${text}`);
  };

  const verifyOtp = async (otp, booking_id) => {
    // console.log('data for api', otp, booking_id);
    const data = {
      otp: otp,
      booking_id: booking_id,
    };

    try {
      let url = 'https://emamumbai.com/api_new/AppController/verify_refund_otp';
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      // console.log('Response received after generating the OTP:', responseData);

      if (responseData.status === 200) {
        Toast.show({
          position: 'bottom',
          type: 'success',
          text1: `OTP verified successfully`,
          visibilityTime: 2000,
          text1Style: {
            fontSize: 14,
          },
          bottomOffset: 5,
        });
        setTimeout(() => {
          Navigation.navigate('Scan');
          // setShowModal(false);
        }, 2000);
      } else if (responseData.status === 404) {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: responseData.message ?? 'Otp not matched',
          visibilityTime: 2000,
          text1Style: {
            fontSize: 14,
          },
          bottomOffset: 5,
        });
      } else {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: responseData.message ?? 'Error occured in verifying otp',
          visibilityTime: 2000,
          text1Style: {
            fontSize: 14,
          },
          bottomOffset: 5,
        });
      }
    } catch (error) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: responseData.message ?? 'Error occured in verifying otp',
        visibilityTime: 2000,
        text1Style: {
          fontSize: 14,
        },
        bottomOffset: 5,
      });
      console.error('Error:', error);
      // setShowModal(false);
    }
  };

  return (
    <View style={verifyOtpModalStyles.otpWrapper}>
      <Text style={verifyOtpModalStyles.title}>Refund otp verification</Text>
      <Text style={verifyOtpModalStyles.subtitle}>Enter your otp here</Text>
      <OtpInput
        focusColor=""
        numberOfDigits={4}
        onTextChange={handleTextChange}
        onFilled={handleFilled}
        theme={{
          containerStyle: verifyOtpModalStyles.otpContainer,
          pinCodeContainerStyle: verifyOtpModalStyles.pinCodeContainer,
          pinCodeTextStyle: verifyOtpModalStyles.pinCodeText,
          focusStickStyle: verifyOtpModalStyles.focusStick,
        }}
      />
      <View style={verifyOtpModalStyles.otpBtn}>
        <TouchableHighlight
          underlayColor="rgba(235, 77, 75,0.7)"
          onPress={() => {
            setShowModal(false);
            setShowOtpSendIndicator(false);
          }}
          style={[
            verifyOtpModalStyles.btn,
            {backgroundColor: 'rgba(235, 77, 75,1.0)'},
          ]}>
          <Text style={verifyOtpModalStyles.btnText}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(46, 213, 115,0.7)"
          onPress={() => {
            verifyOtp(otp, booking_id);
          }}
          style={[
            verifyOtpModalStyles.btn,
            {backgroundColor: 'rgba(46, 213, 115,1.0)'},
          ]}>
          <Text style={verifyOtpModalStyles.btnText}>Verify</Text>
        </TouchableHighlight>
      </View>
      <Toast />
    </View>
  );
};

export default Otpverify;
