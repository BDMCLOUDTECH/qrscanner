import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
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
const CardDetails = ({navigation}) => {
  const route = useRoute();
  const cardDetails = route.params.data.data;
  console.log('the data received on the card details is', cardDetails);
  console.log(Array.isArray(cardDetails));
  return (
    <View style={styles.launchContainer}>
      <View style={styles.launchContainerSectionHeading}>
        <Text style={styles.sectionTextHeading}>Allowed Members</Text>
      </View>
      <ScrollView style={styles.launchContainerSectionHeadingContent}>
        <View>
          {cardDetails &&
            cardDetails.length >= 1 &&
            cardDetails.map(item => (
              <View style={[styles.memberDetailsCont]} key={item.id}>
                <View style={styles.memberNameCont}>
                  <UserIcon name="user-alt" size={25} color="white" />
                  <Text style={styles.itemText}>{item.pass_details}</Text>
                </View>

                <View style={styles.eventAcessCont}>
                  <TouchableOpacity
                    style={styles.eventAcessContDetails}
                    onPress={() => {
                      Alert.alert('entry');
                    }}>
                    <Text style={styles.itemAccessText}>
                      {item.no_of_person_left}
                    </Text>
                    <Text style={styles.itemAccessText}>Entry</Text>
                    <FlagIcon name="flag" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.eventAcessContDetails}>
                    <Text style={styles.itemAccessText}>
                      {item.member_snacks_count_left}
                    </Text>
                    <Text style={styles.itemAccessText}>Snacks</Text>
                    <SnacksIcon name="food-apple" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.eventAcessContDetails}>
                    <Text style={styles.itemAccessText}>
                      {item.member_food_count_left}
                    </Text>
                    <Text style={styles.itemAccessText}>Food</Text>
                    <FoodIcon name="bowl-food" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.eventAcessContDetails}>
                    <Text style={styles.itemAccessText}>
                      {item.member_gift_count_left}
                    </Text>
                    <Text style={styles.itemAccessText}>Gift</Text>
                    <GiftIcon name="gift" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
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
