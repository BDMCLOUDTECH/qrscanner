import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const mainPageStyles = StyleSheet.create({
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

    paddingTop: 10,
    paddingBottom: 10,
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
  refundBtn: {
    width: '100%',
    backgroundColor: '#273485',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    borderRadius: 10,
  },
  refundText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    margin: 20,
    // textAlign: 'center',
    // textAlignVertical: 'center',
  },
  refundLoader: {
    // height: 35,
    // width: 35,
  },
  eventContainer: {
    flex: 1,

    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 10,
    elevation: 1,
  },
  eventTopContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    // flexWrap: 'wrap',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  eventItem: {
    width: windowWidth * 0.43,
    borderRadius: 10,
    padding: 15,
  },
  eventFullWidth: {
    width: windowWidth * 0.8,
  },
});
export const verifyModalStyles = StyleSheet.create({
  otpWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '400',
  },
  otpContainer: {
    width: windowWidth * 0.8,
    marginTop: 20,
  },
  pinCodeContainer: {
    // backgroundColor: '#db1e36',
    backgroundColor: 'rgba(39, 174, 96,0.7)',
    borderRadius: 50,
    width: 70,
    height: 70,
  },

  pinCodeText: {
    color: 'white',
  },
  focusStick: {
    backgroundColor: 'white',
  },
  otpBtn: {
    flexDirection: 'row',

    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop: windowHeight * 0.1,
  },
  btn: {
    width: 140,
    height: 55,
    borderRadius: 10,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  btnItems: {
    display: 'flex',
    flexDirection: 'row',
    width: 140,
    height: 55,
    borderRadius: 10,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,
  },
});
export const verifyOtpModalStyles = StyleSheet.create({
  otpWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '400',
  },
  otpContainer: {
    width: windowWidth * 0.8,
    marginTop: 20,
  },
  pinCodeContainer: {
    // backgroundColor: '#db1e36',
    backgroundColor: 'rgba(39, 174, 96,0.7)',
    borderRadius: 50,
    width: 70,
    height: 70,
  },

  pinCodeText: {
    color: 'white',
  },
  focusStick: {
    backgroundColor: 'white',
  },
  otpBtn: {
    flexDirection: 'row',

    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop: windowHeight * 0.1,
  },
  btn: {
    width: 140,
    height: 55,
    borderRadius: 10,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
