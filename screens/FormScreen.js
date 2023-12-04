import { Dimensions, ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import styles from '../globalStyles'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const rh = Dimensions.get("window").height;
const rw = Dimensions.get('window').width;

export default class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: null,
      phonenb: null,
      message: null,
      waiterName: null,
      reviewID: null,
    }
  }

  async componentDidMount() {
    try {
      const counterRef = firestore().collection('reviewCounter').doc('counter');
      const counterDoc = await counterRef.get();

      if (counterDoc.exists) {
        const counterValue = counterDoc.data().value;
        this.setState({ reviewID: counterValue });
      } else {
        await counterRef.set({ value: 1 });
        this.setState({ reviewID: 1 });
      }

      // Continue with fetching user data
      this.fetchUserData();
    } catch (error) {
      console.error('Error fetching review counter:', error);
    }
  }

  fetchUserData = () => {
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
  };

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
        // Increment the review ID counter in Firestore
        await firestore().collection('reviewCounter').doc('counter').update({
          value: firestore.FieldValue.increment(1),
        });

        // Get the updated review ID
        const counterRef = firestore().collection('reviewCounter').doc('counter');
        const counterDoc = await counterRef.get();
        const updatedReviewID = counterDoc.data().value;

        // Save the review to Firestore with the updated review ID
        const reviewData = {
          reviewID: updatedReviewID,
          email,
          name,
          phonenb,
          message,
          waiterName,
        };

        await firestore().collection('reviews').add(reviewData);

        console.log('Review submitted');
        this.props.navigation.navigate('RecordScreen', { reviewID: updatedReviewID });
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      Alert.alert('Error', 'Please fill out all required fields');
    }
  };

  setName = newName => {
    this.setState({ name: newName });
  }

  setEmail = newEmail => {
    this.setState({ email: newEmail });
  }

  setPhoneNb = newPhoneNb => {
    this.setState({ phonenb: newPhoneNb })
  }

  setMessage = newMessage => {
    this.setState({message: newMessage})
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('../assets/bg2.jpg')} style={{ width: rw, height: rh }}>
          <View style={styles2.header}>
            <Text style={styles2.title}>Please fill out this form to be able to proceed</Text>
          </View>

          <View style={{ marginTop: rh * 0.03 }}>
            <Text style={styles.txt}>Email of the customer: *</Text>
            <TextInput
              style={styles.txtInput}
              placeholder='Enter your Email Address'
              onChangeText={this.setEmail} />
            <Text style={styles.txt}>Name of the customer: *</Text>
            <TextInput
              style={styles.txtInput}
              placeholder='Enter your Full Name'
              onChangeText={this.setName} />
            <Text style={styles.txt}>Phone Number of the customer: *</Text>
            <TextInput
              style={styles.txtInput}
              placeholder='Enter your Phone Number'
              onChangeText={this.setPhoneNb} />
            <Text style={styles.txt}>Message(Optional):</Text>
            <TextInput
              style={{
                width: rw * 0.8,
                height: rh * 0.09,
                borderRadius: 10,
                backgroundColor: 'lightgrey',
                alignSelf: 'center',
                marginTop: rh * 0.019,
                paddingHorizontal: rw * 0.06,
              }}
              placeholder='Any notes?'
              multiline
              onChangeText={this.setMessage} />
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
});
