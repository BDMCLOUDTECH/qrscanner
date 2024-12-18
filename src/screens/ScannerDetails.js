import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  View,
  Alert,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
  Modal,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Otpverify from '../Components/Otpverify';
import Toast from 'react-native-toast-message';
import {mainPageStyles} from '../styles/styles';
import Verify from '../Components/Verify';
import EventItem from '../Components/EventItem';
const ScannerDetails = ({navigation, route}) => {
  console.log('the route received', route?.params?.companyData?.data);
  console.log('on scan detail');
  const [showOtpSendIndicator, setShowOtpSendIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const companyDetail = route?.params?.companyData?.data;
  const [isVisible, setIsVisible] = useState(false);
  const [startVerify, setStartVerify] = useState(false);
  const [refund, setRefund] = useState(false);
  const [type, setType] = useState(false);
  const [otp, setOtp] = useState(false);

  const talalNoOfPerson = companyDetail.number_of_person;
  const noOfPersonLeft = companyDetail.number_of_person_left; // no of person that are allowed to attend the event
  const noOfActivityLeft = companyDetail.member_activity_count_left; // no of person that are allowed to take dinner
  const noOfFoodLeft = companyDetail.member_food_count_left; // no of person that are allowed to take dinner
  const noOfSnacksLeft = companyDetail.member_snacks_count_left; //no of person that are allowed to take snacks
  const noOfGiftLeft = companyDetail.member_gift_count_left; // no of person that are allowed to take gift
  const noOfRefund = companyDetail.refund_member_count; // company refund count of the event
  const isRefundable = companyDetail.is_refundable;
  const general_pass = companyDetail.general_pass;
  const general_pass_id = companyDetail.id;
  const isPassPresident = companyDetail?.pass_president ?? false;
  const person_mobile_no = companyDetail?.person_mobile_no
    ?.trim()
    .split(',')[0];

  const verifyType =
    type !== false && type.charAt(0).toUpperCase() + type.slice(1);
  const alertTitle = type !== false ? `Verify ${verifyType}` : 'Verify Member';

  const alertTitlerefund = 'Verify OTP';

  const alertDiscription = 'Are you sure you want to verify?';
  const alertDiscriptionrefund = 'Please enter the OTP sent to your mobile.';

  const showAlert = () => setIsVisible(true);
  const showOTPBox = () => setIsVisible(true);

  const verifyotp = () => {
    console.log('test');
  };
  const slideAnim = useRef(new Animated.Value(30)).current; // Initial position of the OTP input (30 pixels down)
  const opacityAnim = useRef(new Animated.Value(0)).current; //
  useEffect(() => {
    if (isVisible) {
      // Animate the OTP input box to slide up and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Slide to original position
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Fade in
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const hideAlert = () => {
    setType(false);
    setIsVisible(false);
  };
  const hideRefund = () => {
    setRefund(false);
    setIsVisible(false);
  };
  const API_BASE_URL = 'https://emamumbai.com/api_new/AppController/';

  const personVerified = async () => {
    const url = isPassPresident
      ? API_BASE_URL + 'update_past_president'
      : general_pass
      ? API_BASE_URL + 'update_event_person_general_pass'
      : API_BASE_URL + 'update_event_person';
    console.log('the url for update is', url);
    const data = general_pass
      ? {id: general_pass_id, type: `${type}`}
      : {booking_id: companyDetail.booking_id, type: `${type}`};

    hideAlert();
    setStartVerify(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const json = await response.json();

        navigation.goBack();
      } else if (response.status === 400) {
        const errorJson = await response.json();
        setStartVerify(false);
        setType(false);
        Alert.alert('Not Verified', errorJson.message);
      } else {
        setStartVerify(false);
        setType(false);
        Alert.alert('Not Verified');
        console.error('HTTP Error:', response.status);
      }
    } catch (error) {
      console.log(error);
      setStartVerify(false);
      setType(false);
      Alert.alert('Something Went Wrong!');
      console.error('Error:', error);
    }
  };

  const circleHeight = 500;
  const circleWidth = 500;

  // light dark #1e272e

  /* Code to verify a refund member count while first try to verify person got verified and 1 count got decrement after that when try to
     verify it will show a alert like only one member got refund.
  */
  const refundVerified = async () => {
    const url = API_BASE_URL + 'update_refund_qnty';
    const data = {booking_id: companyDetail.booking_id};
    hideAlert();
    setStartVerify(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const json = await response.json();
        setRefund(false);
        setStartVerify(false);
        navigation.goBack();
      } else if (response.status === 400) {
        const errorJson = await response.json();
        setRefund(false);
        setStartVerify(false);
        Alert.alert('Not Refunded', errorJson.message);
      } else {
        setRefund(false);
        setStartVerify(false);
        Alert.alert('Not Refunded');
        // console.error('HTTP Error:', response.status);
      }
    } catch (error) {
      setRefund(false);
      setStartVerify(false);
      Alert.alert('Not Refunded');
      console.error('Error:', error);
    }
  };

  const handleRefund = async () => {
    //use if no otp is not required
    setShowModal(true);
    //use if otp is required

    // setShowOtpSendIndicator(true);
    // const otpResponse = await generateOtp();

    // if (otpResponse) {
    //   Toast.show({
    //     position: 'bottom',
    //     type: 'success',
    //     text1: `OTP sent successfully to ${person_mobile_no}`,
    //     visibilityTime: 4000,
    //     text1Style: {
    //       fontSize: 14,
    //     },
    //     bottomOffset: 5,
    //   });

    //   // Show OTP input modal or indicator here
    //   setShowModal(true); // Show modal for OTP input
    // } else {

    //   Toast.show({
    //     position: 'bottom',
    //     type: 'error',
    //     text1: 'Failed to send OTP. Please try again.',
    //     visibilityTime: 4000,
    //     text1Style: {
    //       fontSize: 14,
    //     },
    //     bottomOffset: 5,
    //   });
    // }
    // setShowOtpSendIndicator(false);
  };

  const generateOtp = async () => {
    const data = {booking_id: companyDetail.booking_id};
    try {
      let url =
        'https://emamumbai.com/api_new/AppController/generate_otp_for_event_member_refund';
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        return true; // OTP generation successful
      } else if (response.status === 400) {
        const errorData = await response.json(); // Get error details if available
        console.error('Error response data:', errorData);
        Alert.alert(
          'Error occurred',
          'Invalid request. Please check your input.',
        );
        return false; // Indicate failure
      } else {
        Alert.alert(
          'Error occurred',
          'An unexpected error occurred. Please try again.',
        );
        return false; // Indicate failure
      }
    } catch (error) {
      Alert.alert('Error occurred in sending OTP');
      console.error('Error:', error);
      return false; // Indicate failure
    }
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
    <View style={{backgroundColor: '#ffffff', flex: 1, position: 'relative'}}>
      <Modal transparent={true} visible={showModal}>
        {/* <Otpverify
          showModal={showModal}
          setShowModal={setShowModal}
          setShowOtpSendIndicator={setShowOtpSendIndicator}
          booking_id={companyDetail.booking_id}
        /> */}
        <Verify
          showModal={showModal}
          setShowModal={setShowModal}
          setShowOtpSendIndicator={setShowOtpSendIndicator}
          booking_id={companyDetail.booking_id}
        />
      </Modal>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: -370,
          height: circleHeight,
          width: circleWidth,
          borderRadius: 250,
          backgroundColor: '#eb3b5a',
        }}></View>

      {startVerify ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={mainPageStyles.verifyText}>Verifying</Text>
          <ActivityIndicator size={40} />
        </View>
      ) : (
        <View style={mainPageStyles.container}>
          {/* <View style={{flex: 0.2, backgroundColor: 'red'}}> */}
          <Text style={mainPageStyles.heading}>QR Code Details</Text>
          {/* </View> */}
          {companyDetail && (
            <View style={mainPageStyles.companyInfo}>
              <View
                style={[
                  mainPageStyles.shadowContainer,
                  {
                    flex: 0.75,
                    // marginTop: 20,
                    marginBottom: 25,
                  },
                ]}>
                <View
                  style={{
                    flex: 0.33,
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#e3e3e3',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Lato-Bold',
                      marginBottom: 10,
                    }}>
                    Company Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Montserrat-Bold',
                      textAlign: 'center',
                      marginBottom: 10,
                    }}>
                    {companyDetail.name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.4,
                    marginHorizontal: 20,
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#e3e3e3',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Lato-Bold',
                      marginBottom: 10,
                    }}>
                    Event Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Montserrat-Bold',
                      textAlign: 'center',
                      marginBottom: 5,
                    }}>
                    {companyDetail.event_name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.33,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Lato-Bold',
                      marginBottom: 10,
                    }}>
                    Total Person
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'black',
                      fontFamily: 'Montserrat-Bold',
                      textAlign: 'center',
                    }}>
                    {talalNoOfPerson}
                  </Text>
                </View>
              </View>
              <View style={mainPageStyles.eventContainer}>
                <View style={mainPageStyles.eventTopContainer}>
                  <TouchableOpacity
                    style={[
                      mainPageStyles.eventItem,
                      // mainPageStyles.eventFullWidth,
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f7b731',
                        opacity: noOfFoodLeft <= 0 ? 0.6 : 1,
                      },
                    ]}
                    disabled={noOfFoodLeft <= 0}
                    // disabled={true}
                    onPress={() => {
                      showAlert();
                      setType('food');
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        color: '#ffffff',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      {noOfFoodLeft}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#ffffff',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      Food
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#ffffff',
                        marginTop: 5,
                        fontFamily: 'Lato-Bold',
                      }}>
                      Coupon Remaining
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      mainPageStyles.eventItem,
                      // mainPageStyles.eventFullWidth,
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'green',
                        opacity: noOfPersonLeft <= 0 ? 0.6 : 1,
                      },
                    ]}
                    disabled={noOfPersonLeft <= 0}
                    onPress={() => {
                      showAlert();
                      setType('entry');
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        color: '#ffffff',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      {noOfPersonLeft}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#ffffff',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      Entry
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#ffffff',
                        marginTop: 5,
                        fontFamily: 'Lato-Bold',
                      }}>
                      Coupon Remaining
                    </Text>
                  </TouchableOpacity>

                  {/* gift button  */}
                  {/* <TouchableOpacity
                    style={[
                      mainPageStyles.eventItem,
                      {
                        alignItems: 'center',
                        backgroundColor: '#4b7bec',
                        justifyContent: 'center',
                        opacity: noOfGiftLeft <= 0 ? 0.6 : 1,
                      },
                    ]}
                    disabled={noOfGiftLeft <= 0}
                    // disabled={true}
                    onPress={() => {
                      showAlert();
                      setType('gift');
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        color: '#ffffff',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      {noOfGiftLeft}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#ffffff',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      Gift
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#ffffff',
                        marginTop: 5,
                        fontFamily: 'Lato-Bold',
                      }}>
                      Coupon Remaining
                    </Text>
                  </TouchableOpacity> */}
                </View>

                {/* <TouchableOpacity
                  style={[
                    mainPageStyles.eventItem,
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#eb3b5a',
                      opacity: noOfSnacksLeft <= 0 ? 0.6 : 1,
                    },
                  ]}
                  disabled={noOfSnacksLeft <= 0}
                  onPress={() => {
                    showAlert();
                    setType('snacks');
                  }}>
                  <Text
                    style={{
                      fontSize: 35,
                      color: '#ffffff',
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    {noOfSnacksLeft}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#ffffff',
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Snacks
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#ffffff',
                      marginTop: 5,
                      fontFamily: 'Lato-Bold',
                    }}>
                    Coupon Remaining
                  </Text>
                </TouchableOpacity> */}
                {/* <EventItem /> */}
              </View>

              {isRefundable == 1 && !general_pass && (
                <View>
                  {!isPassPresident && (
                    <TouchableHighlight
                      disabled={
                        companyDetail.refund_member_count === '0'
                          ? true
                          : checkNoMember(companyDetail.person_name) === true
                          ? true
                          : false
                      }
                      underlayColor="rgba(39, 55, 133,0.8)"
                      style={[
                        mainPageStyles.refundBtn,
                        {
                          backgroundColor:
                            companyDetail.refund_member_count === '0' ||
                            checkNoMember(companyDetail.person_name)
                              ? 'rgba(164, 176, 190,0.8)'
                              : 'rgba(39, 52, 133,1)',
                        },
                      ]}
                      onPress={() => {
                        handleRefund();
                      }}>
                      <Text style={mainPageStyles.refundText}>
                        {showOtpSendIndicator ? (
                          <ActivityIndicator
                            size={30}
                            style={mainPageStyles.refundLoader}
                            color="white"
                          />
                        ) : checkNoMember(companyDetail.person_name) ? (
                          'Refund Not Available'
                        ) : companyDetail.refund_member_count === '0' ? (
                          'Refunded'
                        ) : (
                          'Click To Refund'
                        )}
                      </Text>
                    </TouchableHighlight>
                  )}
                </View>
              )}
              <Toast />
            </View>
          )}

          <AwesomeAlert
            show={isVisible}
            showProgress={false}
            title={alertTitle}
            message={alertDiscription}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Yes"
            cancelButtonColor="#F00F00"
            confirmButtonColor="#379237"
            // onCancelPressed={refund ? hideRefund : hideAlert}
            // onConfirmPressed={refund ? refundVerified : personVerified}
            onCancelPressed={refund ? hideRefund : hideAlert}
            onConfirmPressed={personVerified}
            contentContainerStyle={{width: windowWidth - 20}}
            titleStyle={{fontSize: 22, fontWeight: 'bold'}}
            messageStyle={{fontSize: 16}}
            confirmButtonStyle={mainPageStyles.alertBtn}
            cancelButtonStyle={{
              flex: 0.4,
              paddingVertical: 15,
              borderRadius: 5,
            }}
            cancelButtonTextStyle={mainPageStyles.alertBtnText}
            confirmButtonTextStyle={mainPageStyles.alertBtnText}
            actionContainerStyle={{
              flexDirection: 'row-reverse',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ScannerDetails;
