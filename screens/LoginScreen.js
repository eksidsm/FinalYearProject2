import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {Component} from 'react';
import styles from '../globalStyles';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
  }
  logIn = async () => {
    const { email, pass } = this.state;
  
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, pass);
      const user = userCredential.user;
  
      const userDoc = await firestore().collection('users').doc(user.uid).get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        const { jobPosition } = userData;
  
        console.log('User Logged In!', userData);
  
        if (
          jobPosition === 'Floor Manager' ||
          jobPosition === 'HR Manager' ||
          jobPosition === 'OM'
        ) {
          // Admin user
          this.props.navigation.navigate('Tabs2');
        } else {
          // Regular user
          this.props.navigation.navigate('Tabs');
        }
      } else {
        console.log('User data not found.');
        // Handle the case where user data is not found in Firestore
        // You can show an error message or redirect to an appropriate screen
      }
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        Alert.alert('Error', 'User Not Found or Wrong Password');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid Email');
      }
  
      console.log(error);
    }
  };
  
  handleRegister = () => {
    this.props.navigation.navigate('RegisterScreen');
  };

  handleEmail = newEmail => {
    this.setState({email: newEmail});
  };

  handlePass = newPass => {
    this.setState({pass: newPass});
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={styles.bgImg}>
          <SafeAreaView>
            <Image
              source={require('../assets/review.png')}
              style={{alignSelf: 'center', width: rw * 0.7, height: rh * 0.35}}
            />
          </SafeAreaView>
          <Text style={{fontSize: 32, textAlign: 'center', color: 'white'}}>
            Welcome
          </Text>
          <Text
            style={{
              paddingHorizontal: 30,
              fontSize: 20,
              marginTop: 10,
              color: 'white',
            }}>
            Add Reviews, Track Your Performance, Enhance Your Profile and
            Experience & more
          </Text>
          <View style={{marginTop: 30}}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="grey"
              style={styles.txtInput}
              onChangeText={this.handleEmail}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="grey"
              style={styles.txtInput}
              onChangeText={this.handlePass}
            />
            <TouchableOpacity onPress={this.handleForgotPass}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 12,
                  marginLeft: rw * 0.12,
                  marginTop: rh * 0.015,
                }}>
                Forgotten Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles2.opc2} onPress={this.logIn}>
            <Text style={{textAlign: 'center', fontSize: 20}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles2.opc2} onPress={this.handleRegister}>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              Create New Account
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  opc2: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    width: rw * 0.7,
    height: rh * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: rh * 0.02,
  },
});