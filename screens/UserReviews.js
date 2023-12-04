import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions, ImageBackground, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class UserReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userReviews: [],
    };
  }

  componentDidMount() {
    const user = auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firestore().collection('users').doc(uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const userFullName = userData.fullName;
          this.setState({
            user: userFullName,
          });

          console.log('waiter in is ', this.state.user);
          console.log('userfullname', userFullName)
          this.fetchUserReviews(userFullName);
        } else {
          console.log('No such document!');
        }
      });
    }
  }

  fetchUserReviews = async (userFullName) => {
    try {
      const reviewsSnapshot = await firestore()
        .collection('reviews')
        .where('waiterName', '==', userFullName)
        .get();

      const reviewsData = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch video data
      const videosSnapshot = await firestore()
        .collection('videos')
        .where('name', '==', userFullName)
        .get();

      const videosData = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Merge video data with reviews data
      const userReviews = reviewsData.map(review => {
        const matchingVideo = videosData.find(video => video.reviewID === review.reviewID);

        return {
          ...review,
          videoURL: matchingVideo ? matchingVideo.downloadURL : null,
          videoDate: matchingVideo ? matchingVideo.date : null,
        };
      });

      console.log('userReviews', userReviews);
      this.setState({ userReviews });
    } catch (error) {
      console.error('Error fetching user reviews', error);
    }
  };

  calculateContainerHeight = (item) => {
    const totalChars =
      (item.name ? item.name.length : 0) +
      (item.phonenb ? item.phonenb.length : 0) +
      (item.email ? item.email.length : 0) +
      (item.message ? item.message.length : 0) +
      (item.videoURL ? item.videoURL.length : 0);
  
    // You can adjust the line length based on your design and font size
    const lineLength = rw * 0.2;
    const numberOfLines = Math.ceil(totalChars / lineLength);
  
    // You can adjust the base height and padding based on your design
    const baseHeight = rh * 0.28;
    const additionalHeight = numberOfLines * (rh * 0.03); // Adjust the multiplier based on your font size
  
    return baseHeight + additionalHeight;
  };
  

  render() {
    const { userReviews } = this.state;

    return (
      <View>
        <ImageBackground style={{width: rw, height: rh}} source={require('../assets/bg2.jpg')}>
        <View style={styles.header}><Text style={styles.title}>UserReviews</Text></View>
        <FlatList
  data={userReviews}
  keyExtractor={(item) => item.id}
  scrollEnabled={true}
  renderItem={({ item }) => (
    <View style={[styles.container, { height: this.calculateContainerHeight(item) }]}>
      <Text>Customer Name: {item.name}</Text>
      <Text>Customer Phone Number: {item.phonenb}</Text>
      <Text>Customer Email: {item.email}</Text>
      <Text>Message: {item.message}</Text>
      <Text>Video URL:</Text>
      <Text 
                  style={{ color: 'blue', textDecorationLine: 'underline' }}
                  onPress={() => Linking.openURL(item.videoURL)}
                >
                  {item.videoURL}
                </Text>
      <Text>Date: {item.videoDate}</Text>
    </View>
  )}
/>
</ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: rw * 0.85,
    height: rh * 0.30,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    margin: rh * 0.015,
    padding: rw * 0.03
  },
  header: {
    width: rw ,
    height: rh * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0
  },
  title: {
    fontSize: 20
  }
})
