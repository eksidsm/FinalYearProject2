import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class ProfileScreen extends Component {
  handleSignOut = () => {
    //firestore auth for signout
    console.log('Signed out');
    this.props.navigation.navigate('LoginScreen');
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{width: rw, height: rh}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity>
              <Text>Upload Your Image</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signout} onPress={this.handleSignOut}>
            <Image
              source={require('../assets/logout.png')}
              style={{width: rw * 0.07, height: rh * 0.035}}
            />
          </TouchableOpacity>

          <View style={styles.details}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: rw * 0.04,
              }}>
              Job Characteristics
            </Text>
            <View style={{marginTop: rh * 0.01}}>
              <Text style={styles.title}>Position: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>uid.position</Text>
              </View>

              <Text style={styles.title}>Branch & Location: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>uid.branch</Text>
              </View>

              <Text style={styles.title}>Phone Number: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>uid.starsRating</Text>
              </View>

              <Text style={styles.title}>Overall Stars Rating: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>uid.phoneNB</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginLeft: rw * 0.04,
    color: 'black',
  },
  imageContainer: {
    width: rw * 0.45,
    height: rh * 0.22,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    marginTop: rh * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    width: rw,
    height: rh,
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  info: {
    width: rw * 0.9,
    height: rh * 0.07,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    marginLeft: rw * 0.04,
    marginTop: rh * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innertxt: {
    fontSize: 20,
  },
  signout: {
    width: rw * 0.17,
    height: rh * 0.07,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: rw * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rh * 0.01,
  },
});