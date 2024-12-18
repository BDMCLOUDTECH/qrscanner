import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {verifyModalStyles} from '../styles/styles';

const Verify = ({
  showModal,
  setShowModal,
  setShowOtpSendIndicator,
  booking_id,
}) => {
  const [showLoader, setShowLoader] = useState(false);
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

  const verifyOtp = async booking_id => {
    setShowLoader(true);
    console.log('data for api', booking_id);
    const data = {
      booking_id: booking_id,
    };

    try {
      let url = 'https://emamumbai.com/api_new/AppController/verify_refund';
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
          text1: `verified successfully`,
          visibilityTime: 2000,
          text1Style: {
            fontSize: 14,
          },
          bottomOffset: 5,
        });
        setTimeout(() => {
          Navigation.navigate('Scan');
          // setShowModal(false);
        }, 300);
      } else {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: responseData.message ?? 'Failed To Verify',
          visibilityTime: 2000,
          text1Style: {
            fontSize: 14,
          },
          bottomOffset: 5,
        });
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: responseData.message ?? 'Error occured in verifying',
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
    <View style={verifyModalStyles.otpWrapper}>
      <Text style={verifyModalStyles.title}>Refund verification</Text>
      <Text style={verifyModalStyles.subtitle}>
        Are you sure you want to refund?
      </Text>
      <View style={verifyModalStyles.otpBtn}>
        <TouchableHighlight
          underlayColor="rgba(235, 77, 75,0.7)"
          onPress={() => {
            setShowModal(false);
            setShowOtpSendIndicator(false);
          }}
          style={[
            verifyModalStyles.btn,
            {backgroundColor: 'rgba(235, 77, 75,1.0)'},
          ]}>
          <Text style={verifyModalStyles.btnText}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          disabled={showLoader} // Simplified condition
          underlayColor="rgba(46, 213, 115,0.7)"
          onPress={() => {
            verifyOtp(booking_id);
          }}
          style={[
            verifyModalStyles.btn,
            {
              backgroundColor: showLoader
                ? 'rgba(46, 213, 115,0.5)' // Dimmed color when disabled
                : 'rgba(46, 213, 115,1.0)',
            },
          ]}>
          <View style={[verifyModalStyles.btnItems]}>
            {showLoader ? (
              <ActivityIndicator size={30} color="white" />
            ) : (
              <Text style={verifyModalStyles.btnText}>Verify</Text>
            )}
          </View>
        </TouchableHighlight>
      </View>
      <Toast />
    </View>
  );
};

export default Verify;
