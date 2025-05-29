import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import PdfIcon from 'react-native-vector-icons/FontAwesome5';
import CardIcon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const LaunchScreen = ({navigation}) => {
  return (
    <View style={styles.launchContainer}>
      <TouchableHighlight
        style={styles.launchContainerItem}
        onPress={() => {
          navigation.navigate('Scan');
        }}
        underlayColor="transparent">
        <View
          style={[
            styles.launchContainerItemCont,
            styles.launchContainerItemPass,
          ]}>
          <Text style={styles.itemText}>Pass</Text>
          <PdfIcon name="file-pdf" size={30} color="white" />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.launchContainerItem}
        onPress={() => {
          navigation.navigate('CardScan');
        }}
        underlayColor="transparent">
        <View
          style={[
            styles.launchContainerItemCont,
            styles.launchContainerItemCard,
          ]}>
          <Text style={styles.itemText}>Ema Card</Text>
          <CardIcon name="id-card" size={30} color="white" />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  launchContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  launchContainerItem: {
    width: windowWidth * 0.42,
    height: windowWidth * 0.42,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchContainerItemCont: {
    flex: 1,

    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
  },
  launchContainerItemPass: {
    backgroundColor: '#ff4757',
  },
  launchContainerItemCard: {
    backgroundColor: '#0984e3',
  },
  itemText: {
    fontSize: 22,
    color: 'white',
    fontWeight: '500',
  },
  itemIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default LaunchScreen;
