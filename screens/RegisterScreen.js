import { ImageBackground, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import styles from '../globalStyles'
import MyDatePicker from '../components/DatePicker';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

export default class RegisterScreen extends Component {
    constructor(props){
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
        }
    }
    handleName = newName => {
        this.setState({fullName: newName})
    }
    handleDOBSelected = selectedDate => {
        this.setState({DOB: selectedDate})
    }
    handlePass = newPass => {
        this.setState({password: newPass})
    }
    handleConfirmPass = newPassConfirm => {
        const {password} = this.state;
        if (newPassConfirm === this.state.password) {
          console.log('Passwords are identical');
          this.setState({confirmPass: newPassConfirm});
        } else {
          console.log("Passwords doesn't match");
        }
    }
    handleEmail = newEmail => {
        this.setState({email: newEmail})
    }
    handleRestaurant = newRestaurant => {
        this.setState({restaurant: newRestaurant})
    }
    handleJobPosition = newJobPosition => {
        this.setState({jobPosition: newJobPosition})
    }
    handlePhoneNb = newPhoneNb => {
        this.setState({phoneNB: newPhoneNb})
    }
  render() {
    return (
      <View>
        <ImageBackground source={require('../assets/bg2.jpg')} style={styles.bgImg}>
        <Text style={{textAlign: 'center', fontSize: 32, color: 'white', marginTop: rh * 0.07}}>Create New Account</Text>
      <View style={{marginTop: rh * 0.02}}>
      <TextInput 
        style={styles.txtInput}
        placeholder='Enter your Name'
        onChangeText={this.handleName}
        />
        <TextInput 
        style={styles.txtInput}
        placeholder='Enter your Email Address'
        onChangeText={this.handleEmail}
        />
        <TextInput 
        style={styles.txtInput}
        placeholder='Enter your Password'
        onChangeText={this.handlePass}
        />
        <TextInput 
        style={styles.txtInput}
        placeholder='Confirm your Password'
        onChangeText={this.handleConfirmPass}
        />
         <MyDatePicker onDOBSelected={this.handleDOBSelected} />
        <TextInput 
        style={styles.txtInput}
        placeholder='Enter your Restaurant & Branch'
        onChangeText={this.handleRestaurant}
        />
        <TextInput 
        style={styles.txtInput}
        placeholder='Enter your Job Position'
        onChangeText={this.handleJobPosition}
        />
        <TextInput 
        style={styles.txtInput}
        placeholder='Enter your Phone Number'
        onChangeText={this.handlePhoneNb}
        />
      </View>

      <TouchableOpacity style={styles.opc}>
        <Text>Register</Text>
      </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}