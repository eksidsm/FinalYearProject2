import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, FlatList, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class AdminUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFullName: '',
      userReviews: [],
    };
  }

  componentDidMount() {
    const user = auth().currentUser;
    if (user) {
      const adminUid = user.uid;
      const { route } = this.props;
      const { params } = route;
      const { employeeId } = params;

      this.fetchEmployeeDetails(adminUid, employeeId);
    }
  }

  fetchEmployeeDetails = async (adminUid, employeeId) => {
    try {
      // Fetch employee details
      const employeeSnapshot = await firestore()
        .collection('admins')
        .doc(adminUid)
        .collection('employees')
        .doc(employeeId)
        .get();
  
      const employeeData = employeeSnapshot.data();
  
      this.setState({ userFullName: employeeData.employeeName });
  
      // Fetch reviews for the user
      const reviewsSnapshot = await firestore()
        .collection('reviews')
        .where('waiterName', '==', this.state.userFullName)
        .get();
  
      const reviewsData = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Fetch videos for the user
      const videosSnapshot = await firestore()
        .collection('videos')
        .where('name', '==', this.state.userFullName)
        .get();
  
      const videosData = videosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Merge video data with reviews data
      const userReviews = reviewsData.map((review) => {
        const matchingVideo = videosData.find((video) => video.reviewID === review.reviewID);
  
        return {
          ...review,
          videoURL: matchingVideo ? matchingVideo.downloadURL : null,
          videoDate: matchingVideo ? matchingVideo.date : null,
        };
      });
  
      console.log('userReviews', userReviews);
      this.setState({ userReviews });
    } catch (error) {
      console.error('Error fetching user details', error);
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
        <ImageBackground style={{ width: rw, height: rh }} source={require('../assets/bg2.jpg')}>
          <View style={styles.header}><Text style={styles.title}>Employee Reviews</Text></View>
          <FlatList
            data={userReviews}
            keyExtractor={(item) => item.id}
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
  container: {
    width: rw * 0.85,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    margin: rh * 0.015,
    padding: rw * 0.03,
  },
  header: {
    width: rw,
    height: rh * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0,
  },
  title: {
    fontSize: 20,
  },
});
