import { Dimensions, ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import styles from '../globalStyles'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const rh = Dimensions.get("window").height;
const rw = Dimensions.get('window').width;

export default class FormScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: null,
      name: null,
      phonenb: null,
      message: null,
      waiterName: null,
    }
  }

  handleContinue = async () => {
    const { email, name, phonenb, message, waiterName } = this.state;
    const user = auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firestore().collection('users').doc(uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          this.setState({
            waiterName: userData.fullName,
          });
        } else {
          console.log('No such document!');
        }
      });
    }

    console.log('waiter name to be added ', waiterName);
  
    if (email && name && phonenb && waiterName) {
      try {
        const reviewData = {
          email,
          name,
          phonenb,
          message,
          waiterName ,
        }
  
        // Save the review to Firestore
        await firestore().collection('reviews').add(reviewData);
  
        console.log('Review submitted');
        this.props.navigation.navigate('RecordScreen');
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      Alert.alert('Error', 'Please fill out all required fields');
    }
  };
  

  setName = newName => {
    this.setState({name: newName});
  }

  setEmail = newEmail => {
    this.setState({email: newEmail});
  }

  setPhoneNb = newPhoneNb => {
    this.setState({phonenb: newPhoneNb})
  }
  render() {
    return (
      <View>
        <ImageBackground source={require('../assets/bg2.jpg')} style={{width: rw, height: rh}}>
            <View style={styles2.header}>
            <Text style={styles2.title}>Please fill out this form to be able to proceed</Text>
            </View>

            <View style={{marginTop: rh * 0.03}}>
            <Text style={styles.txt}>Email of the customer: *</Text>
            <TextInput 
            style={styles.txtInput}
            placeholder='Enter your Email Address'
            onChangeText={this.setEmail}/>
            <Text style={styles.txt}>Name of the customer: *</Text>
            <TextInput 
            style={styles.txtInput}
            placeholder='Enter your Full Name'
            onChangeText={this.setName}/>
            <Text style={styles.txt}>Phone Number of the customer: *</Text>
            <TextInput 
            style={styles.txtInput}
            placeholder='Enter your Phone Number'
            onChangeText={this.setPhoneNb}/>
            <Text style={styles.txt}>Message(Optional):</Text>
            <TextInput 
            style={{
                width: rw * 0.8,
                height: rh * 0.09,
                borderRadius: 10,
                backgroundColor: 'lightgrey',
                alignSelf: 'center',
                marginTop: rh * 0.019, 
                paddingHorizontal: rw * 0.06,}}
            placeholder='Any notes?'
            multiline/>
            </View>

            <TouchableOpacity style={styles.opc} onPress={this.handleContinue}>
                <Text>Continue</Text>
            </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

const styles2 = StyleSheet.create({
    header: {
        width: rw * 0.8,
        height: rh * 0.1,
        backgroundColor: 'white',
        marginTop: rh * 0.07,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    title: {
        fontSize: rh * 0.027,
      textAlign: 'center',
      color: 'black',
    }
})