import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScanDetail = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const companyDetail = route?.params?.companyData?.data;
  const [isVisible, setIsVisible] = useState(false);
  const [startVerify, setStartVerify] = useState(false);
  const [refund, setRefund] = useState(false);
  const [type, setType] = useState(false);
  // console.log(companyDetail);

  const noOfPersonLeft = companyDetail.number_of_person_left; // no of person that are allowed to attend the event
  const noOfFoodLeft = companyDetail.member_food_count_left; // no of person that are allowed to take dinner
  const noOfGiftLeft = companyDetail.member_gift_count_left; // no of person that are allowed to take gift
  const noOfRefund = companyDetail.refund_member_count; // company refund count of the event
  const isRefundable = companyDetail.is_refundable;
  const general_pass = companyDetail.general_pass;
  const general_pass_id = companyDetail.id;
  const verifyType =
    type !== false && type.charAt(0).toUpperCase() + type.slice(1);
  const alertTitle = refund
    ? 'Verify Refund'
    : type !== false
    ? `Verify ${verifyType}`
    : 'Verify Member';
  const alertDiscription = refund
    ? 'Are you sure you want to refund?'
    : 'Are you sure you want to verify?';
  console.log(type);
  const showAlert = () => setIsVisible(true);
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
    const url = general_pass
      ? API_BASE_URL + 'update_event_person_general_pass'
      : API_BASE_URL + 'update_event_person';

    const data = general_pass
      ? {id: general_pass_id}
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

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1, position: 'relative'}}>
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
          <Text style={styles.verifyText}>Verifying</Text>
          <ActivityIndicator size={40} />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <View style={{flex: 0.2, backgroundColor: 'red'}}> */}
          <Text style={styles.heading}>QR Code Details</Text>
          {/* </View> */}
          {companyDetail && (
            <View style={styles.companyInfo}>
              <View
                style={[
                  styles.shadowContainer,
                  {
                    flex: 0.7,
                    marginTop: 20,
                    marginBottom: 25,
                  },
                ]}>
                <View
                  style={{
                    flex: 0.5,
                    marginHorizontal: 20,
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
                    }}>
                    {companyDetail.name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    }}>
                    {companyDetail.event_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  gap: 25,
                  marginBottom: 25,
                  // borderColor: 'yellow',
                  // borderWidth: 1,
                }}>
                <View
                  style={[
                    styles.shadowContainer,
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#eb3b5a',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 35,
                      color: '#ffffff',
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    {companyDetail.number_of_person}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#ffffff',
                      marginTop: 5,
                      fontFamily: 'Lato-Bold',
                    }}>
                    Total Person
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.shadowContainer,
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#20bf6b',
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
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  gap: 25,
                  marginBottom: 25,
                  // borderColor: 'yellow',
                  // borderWidth: 1,
                }}>
                <TouchableOpacity
                  style={[
                    styles.shadowContainer,
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
                    styles.shadowContainer,
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
                </TouchableOpacity>
              </View>
              {isRefundable == 1 && !general_pass && (
                <View
                  style={{
                    flex: 0.15,
                    justifyContent: 'flex-end',
                    marginBottom: 25,
                  }}>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#E3E3E3"
                    disabled={noOfRefund <= 0}
                    onPress={() => {
                      showAlert();
                      setRefund(true);
                    }}
                    style={[
                      styles.shadowContainer,
                      {
                        minHeight: 50,
                        justifyContent: 'center',
                        backgroundColor:
                          noOfRefund <= 0 ? '#F00F00' : '#273485',
                        opacity: noOfRefund <= 0 ? 0.6 : 1,
                        borderRadius: 50,
                        elevation: 3,
                        shadowColor: '#ffffff',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        gap: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          flexDirection: 'column',
                          fontFamily: 'Montserrat-Bold',
                        }}>
                        {noOfRefund <= 0
                          ? 'already refunded'
                          : 'Click To Refund'}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            </View>
          )}

          {/* <View style={styles.buttonContainer}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: '#379237',
                    opacity: noOfPersonLeft <= 0 ? 0.6 : 1,
                  },
                ]}
                activeOpacity={0.6}
                disabled={noOfPersonLeft <= 0}
                onPress={() => {
                  showAlert();
                  setType('entry');
                }}>
                <Text style={styles.buttonText}>VERIFY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#F00F00'}]}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View> */}

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
            onCancelPressed={refund ? hideRefund : hideAlert}
            onConfirmPressed={refund ? refundVerified : personVerified}
            contentContainerStyle={{width: windowWidth - 20}}
            titleStyle={{fontSize: 22, fontWeight: 'bold'}}
            messageStyle={{fontSize: 16}}
            confirmButtonStyle={styles.alertBtn}
            cancelButtonStyle={{
              flex: 0.4,
              paddingVertical: 15,
              borderRadius: 5,
            }}
            cancelButtonTextStyle={styles.alertBtnText}
            confirmButtonTextStyle={styles.alertBtnText}
            actionContainerStyle={{
              flexDirection: 'row-reverse',
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 'auto',
    marginTop: 40,
    flex: 0.2,
    color: '#FFFFFF',
    // backgroundColor: 'yellow',
    textAlign: 'center',
  },
  companyInfo: {
    flex: 1,
    marginBottom: 'auto',
    borderRadius: 20,
    // padding: 20,
    // borderWidth: 1,
    // borderColor: 'red',
    marginHorizontal: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    flex: 0.2,
    marginTop: 'auto',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  verifyText: {
    marginBottom: 5,
  },
  shadowContainer: {
    flex: 0.5,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
  },

  // Verify Popup Styling

  alertBtn: {
    flex: 0.4,
    paddingVertical: 15,
    borderRadius: 5,
  },
  alertBtnText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ScanDetail;
