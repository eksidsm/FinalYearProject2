import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
      console.log('reviews data ', reviewsData);
      this.setState({ userReviews: reviewsData });
    } catch (error) {
      console.error('Error fetching user reviews', error);
    }
  };

  render() {
    const { userReviews } = this.state;

    return (
      <View>
        <Text>UserReviews</Text>
        <FlatList
  data={userReviews}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={{ marginBottom: 10, padding: 10, border: '1px solid #ddd' }}>
      <Text>Customer Name: {item.name}</Text>
      <Text>Customer Phone Number: {item.phonenb}</Text>
      <Text>Customer Email: {item.email}</Text>
      <Text>Message: {item.message}</Text>
    </View>
  )}
/>
      </View>
    );
  }
}
