import {StyleSheet, Dimensions} from 'react-native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  container: {},
  bgImg: {
    width: rw,
    height: rh,
  },
  opc: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    width: rw * 0.8,
    height: rh * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: rh * 0.05,
  },
  txtInput: {
    width: rw * 0.8,
    height: rh * 0.05,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    marginTop: rh * 0.019,
    paddingHorizontal: rw * 0.06,
  },
  txt: {
    fontSize: rh * 0.02,
    color: 'black',
    marginLeft: rw * 0.1,
    marginTop: rh * 0.02,
  },
});