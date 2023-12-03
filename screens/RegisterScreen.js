import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {Component} from 'react';
import styles from '../globalStyles';
import MyDatePicker from '../components/DatePicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MyContext from '../context/myContext';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

export default class RegisterScreen extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      fullName: '',
      DOB: '',
      password: '',
      confirmPass: '',
      email: '',
      restaurant: '',
      jobPosition: '',
      phoneNB: '',
      id: '',
    };
  }

  SignUp = async () => {
    const { email, DOB, restaurant, jobPosition, fullName, phoneNB, password } = this.state;
  
    let uid;

    const currentDate = new Date();
    const birthDate = new Date(DOB);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
  
    if (age < 18) {
      Alert.alert('Error Creating Account', 'Creating Account requires Age of 18 or above.');
      return;
    }
  
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      uid = user.uid;
  
      // Generate a unique 5-digit ID based on job position
      let id = '';
      if (
        jobPosition === 'Floor Manager' ||
        jobPosition === 'HR Manager' ||
        jobPosition === 'OM'
      ) {
        id = String(Math.floor(Math.random() * 1001)); // Generate ID from 0000 to 1000
      } else {
        id = String(Math.floor(Math.random() * (9999 - 1001 + 1)) + 1001); // Generate ID from 1001 to 9999
      }
  
      await firestore().collection('users').doc(uid).set({
        email,
        fullName,
        DOB,
        restaurant,
        jobPosition,
        phoneNB,
        id,
      });
  
      console.log('User Created and Firestore Document created successfully.');
      console.log('Redirecting: ' + fullName + ' to Home Screen');
  
      if (
        jobPosition === 'Waiter' ||
        jobPosition === 'Runner' ||
        jobPosition === 'Bartender' ||
        jobPosition === 'Barista' ||
        jobPosition === 'Head Waiter'
      ) {
        // Regular user
        this.props.navigation.navigate('Tabs');
      } else if (
        jobPosition === 'Floor Manager' ||
        jobPosition === 'HR Manager' ||
        jobPosition === 'OM'
      ) {
        // Admin user
        this.props.navigation.navigate('Tabs2');
      } else {
        Alert.alert(
          'Error Occurred',
          'Your job position may not be covered in our app, please check and try again'
        );
      }
    } catch (error) {
      console.log('Error occurred: ', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email already in use');
      } else {
        Alert.alert('Error', 'An error occurred while creating the account.');
      }
    }
  };
  

  handleName = newName => {
    this.setState({fullName: newName});
  };
  handleDOBSelected = selectedDate => {
    this.setState({DOB: selectedDate});
  };
  handlePass = newPass => {
    this.setState({password: newPass});
  };
  handleConfirmPass = newPassConfirm => {
    const {password} = this.state;
    if (newPassConfirm === this.state.password) {
      console.log('Passwords are identical');
      this.setState({confirmPass: newPassConfirm});
    } else {
      console.log("Passwords doesn't match");
    }
  };
  handleEmail = newEmail => {
    this.setState({email: newEmail});
  };
  handleRestaurant = newRestaurant => {
    this.setState({restaurant: newRestaurant});
  };
  handleJobPosition = newJobPosition => {
    this.setState({jobPosition: newJobPosition});
  };
  handlePhoneNb = newPhoneNb => {
    this.setState({phoneNB: newPhoneNb});
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={styles.bgImg}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 32,
              color: 'white',
              marginTop: rh * 0.07,
            }}>
            Create New Account
          </Text>
          <View style={{marginTop: rh * 0.02}}>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Name"
              placeholderTextColor="grey"
              onChangeText={this.handleName}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Email Address"
              placeholderTextColor="grey"
              onChangeText={this.handleEmail}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Password"
              placeholderTextColor="grey"
              onChangeText={this.handlePass}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Confirm your Password"
              placeholderTextColor="grey"
              onChangeText={this.handleConfirmPass}
            />
            <MyDatePicker onDOBSelected={this.handleDOBSelected} />
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Restaurant & Branch"
              placeholderTextColor="grey"
              onChangeText={this.handleRestaurant}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Job Position"
              placeholderTextColor="grey"
              onChangeText={this.handleJobPosition}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Phone Number"
              placeholderTextColor="grey"
              onChangeText={this.handlePhoneNb}
            />
          </View>

          <TouchableOpacity style={styles.opc} onPress={this.SignUp}>
            <Text style={{fontSize: 19}}>Register</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}