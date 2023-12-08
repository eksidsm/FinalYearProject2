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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    position: '',
    branch: '',
    //starsRating: '',
    phoneNB: '',
    fullName: '',
    id: '',
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    const user = auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firestore().collection('users').doc(uid);

      // Subscribe to the user document
      const unsubscribe = userRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          this.setState({
            position: userData.jobPosition,
            branch: userData.restaurant,
            starsRating: userData.starsRating,
            phoneNB: userData.phoneNB,
            fullName: userData.fullName,
            id: userData.id,
          });
        }
      });

      // Unsubscribe when the component unmounts
      this.unsubscribe = unsubscribe;
    }
  };

  componentWillUnmount() {
    // Unsubscribe when the component unmounts to avoid memory leaks
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User Signed Out.');
        this.props.navigation.navigate('LoginScreen');
      })
      .catch(error => {
        console.error('Sign-out error:', error);
      });
  };

  render() {
    const { position, branch, starsRating, phoneNB, fullName, id } = this.state;

    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{width: rw, height: rh}}>

          {/* User Information Container */}
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>Name: {fullName}</Text>
          </View>

          {/* Signout Button */}
          <TouchableOpacity style={styles.signout} onPress={this.signOut}>
            <Text style={{fontSize: 10}}>Sign Out</Text>
            <Image
              source={require('../assets/logout.png')}
              style={{width: rw * 0.07, height: rh * 0.035}}
            />
          </TouchableOpacity>

          {/* Job Characteristics Container */}
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
                <Text style={styles.innertxt}>{position}</Text>
              </View>

              <Text style={styles.title}>Branch & Location: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>{branch}</Text>
              </View>

              <Text style={styles.title}>ID: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>{id}</Text>
              </View>

              <Text style={styles.title}>Phone Number: </Text>
              <View style={styles.info}>
                <Text style={styles.innertxt}>{phoneNB}</Text>
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
  userInfoContainer: {
    width: rw * 0.70,
    height: rh * 0.15,
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    marginTop: rh * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  userId: {
    fontSize: 18,
    color: 'black',
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
    height: rh * 0.08,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    marginLeft: rw * 0.04,
    marginTop: rh * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innertxt: {
    fontSize: 20,
    color: 'grey'
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
