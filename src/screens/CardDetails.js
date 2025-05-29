import {useRoute} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import CardIcon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import FlagIcon from 'react-native-vector-icons/FontAwesome';
import SnacksIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoodIcon from 'react-native-vector-icons/FontAwesome6';
import GiftIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import {mainPageStyles} from '../styles/styles';
const CardDetails = ({navigation}) => {
  const route = useRoute();
  const [companyData, setCompanyData] = useState({
    id: null,
    info: null,
  });
  const [type, setType] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [startVerify, setStartVerify] = useState(false);
  const verifyType =
    type !== false && type.charAt(0).toUpperCase() + type.slice(1);
  const alertTitle = type !== false ? `Verify ${verifyType}` : 'Verify Member';
  const alertDiscription = 'Are you sure you want to verify?';
  const cardDetails = route.params.data.data;
  // console.log('the data received on the card details is', cardDetails);
  // console.log(Array.isArray(cardDetails));
  // const API_BASE_URL = 'https://emamumbai.com/api_new/AppController/';
  const API_BASE_URL = 'https://emamumbai.com/api_new/AppController/';
  const showAlert = (company, id) => {
    setCompanyData({id: company.id, info: company});
    setIsVisible(true);
  };
  const hideAlert = () => {
    setType(false);
    setIsVisible(false);
  };
  const personVerified = async (companyDetail, id) => {
    // console.log(
    //   'the data inside the person verified for company data is',
    //   companyData,
    // );
    let isPassPresident = null;
    const url = isPassPresident
      ? API_BASE_URL + 'update_past_president'
      : // : API_BASE_URL + 'update_event_person';
        API_BASE_URL + 'update_event_person_from_ema_card';
    console.log('the url for update is', url);
    let data = {};
    if (companyData?.id) {
      data = {booking_id: companyData.id, type: `${type}`};
    } else {
      return Alert.alert('company id is missing');
    }

    console.log('data sent is ', data);

    hideAlert();
    setStartVerify(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      // console.log('response: ', response);

      if (response.status === 200) {
        const json = await response.json();
        // console.log('the response received is', json);
        setCompanyData({id: null, info: null});
        navigation.navigate('LaunchScreen');
      } else if (response.status === 400) {
        const errorJson = await response.json();
        setStartVerify(false);
        setType(false);
        Alert.alert('Not Verified', errorJson.message);
        navigation.navigate('LaunchScreen');
      } else {
        setStartVerify(false);
        setType(false);
        Alert.alert('Not Verified');
        console.error('HTTP Error:', response.status);
        navigation.navigate('LaunchScreen');
      }
    } catch (error) {
      console.log(error);
      setStartVerify(false);
      setType(false);
      Alert.alert('Something Went Wrong!');
      console.error('Error:', error);
      navigation.navigate('LaunchScreen');
    }
  };
  return (
    <View style={styles.launchContainer}>
      <View style={styles.launchContainerSectionHeading}>
        <Text style={styles.sectionTextHeading}>Allowed Members</Text>
      </View>
      {startVerify ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={mainPageStyles.verifyText}>Verifying</Text>
          <ActivityIndicator size={40} />
        </View>
      ) : (
        <ScrollView style={styles.launchContainerSectionHeadingContent}>
          <View>
            {cardDetails &&
              cardDetails.length >= 1 &&
              cardDetails.map(item => (
                <View style={[styles.memberDetailsCont]} key={item.id}>
                  <View style={styles.memberNameCont}>
                    <UserIcon name="user-alt" size={25} color="white" />
                    <Text style={styles.itemText}>
                      {item.pass_details} {item.id}
                    </Text>
                  </View>

                  <View style={styles.eventAcessCont}>
                    <TouchableOpacity
                      style={styles.eventAcessContDetails}
                      disabled={item.no_of_person_left <= 0}
                      onPress={() => {
                        showAlert(item, item.id);
                        setType('entry');
                      }}>
                      <Text style={styles.itemAccessText}>
                        {item.no_of_person_left}
                      </Text>
                      <Text style={styles.itemAccessText}>Entry</Text>
                      <FlagIcon name="flag" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.eventAcessContDetails}
                      disabled={item.member_snacks_count_left <= 0}
                      onPress={() => {
                        showAlert(item, item.id);
                        setType('snacks');
                      }}>
                      <Text style={styles.itemAccessText}>
                        {item.member_snacks_count_left}
                      </Text>
                      <Text style={styles.itemAccessText}>Snacks</Text>
                      <SnacksIcon name="food-apple" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.eventAcessContDetails}
                      disabled={item.member_food_count_left <= 0}
                      onPress={() => {
                        showAlert(item, item.id);
                        setType('food');
                      }}>
                      <Text style={styles.itemAccessText}>
                        {item.member_food_count_left}
                      </Text>
                      <Text style={styles.itemAccessText}>Food</Text>
                      <FoodIcon name="bowl-food" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.eventAcessContDetails}
                      disabled={item.member_gift_count_left <= 0}
                      onPress={() => {
                        showAlert(item, item.id);
                        setType('gift');
                      }}>
                      <Text style={styles.itemAccessText}>
                        {item.member_gift_count_left}
                      </Text>
                      <Text style={styles.itemAccessText}>Gift</Text>
                      <GiftIcon name="gift" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
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
                    // onCancelPressed={refund ? hideRefund : hideAlert}
                    // onCancelPressed={refund ? hideRefund : hideAlert}
                    onCancelPressed={() => {
                      setIsVisible(false);
                    }}
                    onConfirmPressed={() => {
                      personVerified();
                    }}
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
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  launchContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTextHeading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  launchContainerSectionHeading: {
    width: '100%',
    flex: 0.08,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchContainerSectionHeadingContent: {
    flex: 0.92,
    width: '100%',

    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 7,
  },
  launchContainerItem: {
    width: windowWidth * 0.42,
    height: windowWidth * 0.42,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberDetailsCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // gap: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
    // backgroundColor: '#0984e3',
    backgroundColor: '#1e272e',
    padding: 3,
    paddingBottom: 10,
  },
  memberNameCont: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 15,

    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  itemAccessText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  itemIcon: {
    fontSize: 24,
    color: 'white',
  },
  itemAccessTextIcon: {
    fontSize: 20,
    color: 'white',
  },
  eventAcessCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  eventAcessContDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#0984e3',
  },
});

export default CardDetails;
