import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class EmployeeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: '',
      employeeId: '',
      adminRestaurant: '',
      adminName: '',
    };
  }

  componentDidMount() {
    this.fetchAdminRestaurant();
  }

  fetchAdminRestaurant = () => {
    const user = auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firestore().collection('users').doc(uid);

      const unsubscribe = userRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const restaurant = userData.restaurant;
          const admin = userData.fullName;
          this.setState({ adminRestaurant: restaurant, adminName: admin });
        }
      });
    }
  };

  handleEmployeeIdChange = (employeeId) => {
    this.setState({ employeeId });
  };

  handleAddEmployee = async () => {
    const { employeeId } = this.state;
    const adminId = auth().currentUser.uid;

    try {
      // Check if the employeeId is not empty
      if (!employeeId) {
        Alert.alert('Error', 'Please enter the employee ID');
        return;
      }

      // Search for the employee in the users collection
      const userRef = firestore().collection('users').where('id', '==', employeeId);
      const userQuery = await userRef.get();

      if (!userQuery.empty) {
        // Get the first document matching the query
        const userData = userQuery.docs[0].data();
        const { jobPosition, fullName } = userData;
        console.log('user data is: ', userData);

        if (
          jobPosition === 'Waiter' ||
          jobPosition === 'Runner' ||
          jobPosition === 'Barista' ||
          jobPosition === 'Bartender'
        ) {
          const adminRef = firestore().collection('admins').doc(adminId);
          await adminRef.collection('employees').doc(employeeId, ' ', fullName).set({
            adminId,
            admin: this.state.adminName,
            adminRestaurant: this.state.adminRestaurant,
            employeeName: fullName,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

          Alert.alert('Success', 'Employee added successfully!');
        } else {
          Alert.alert('Error', 'Selected user is not a valid employee.');
        }
      } else {
        Alert.alert('Error', 'User with the provided ID not found.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      Alert.alert('Error', 'An error occurred while adding the employee.');
    }
  };

  handleRemoveEmployee = async () => {
    const { employeeId } = this.state;
    const adminId = auth().currentUser.uid;

    try {
      // Check if the employeeId is not empty
      if (!employeeId) {
        Alert.alert('Error', 'Please enter the employee ID');
        return;
      }

      // Remove the employee from the admin's collection
      const adminRef = firestore().collection('admins').doc(adminId);
      await adminRef.collection('employees').doc(employeeId).delete();

      Alert.alert('Success', 'Employee removed successfully!');
    } catch (error) {
      console.error('Error removing employee:', error);
      Alert.alert('Error', 'An error occurred while removing the employee.');
    }
  };

  render() {
    return (
      <View>
        <ImageBackground source={require('../assets/bg2.jpg')} style={{ width: rw, height: rh }}>
          <Text style={styles.title}>
            Manage employees for {this.state.adminRestaurant}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add/Remove employee's ID"
              placeholderTextColor="grey"
              onChangeText={this.handleEmployeeIdChange}
            />
            <TouchableOpacity style={styles.addRemoveButton} onPress={this.handleAddEmployee}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addRemoveButton} onPress={this.handleRemoveEmployee}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },
  inputContainer: {
    marginTop: rh * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: rh * 0.1,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
    paddingLeft: 10,
    color: 'white',
  },
  addRemoveButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    width: rw * 0.5,
    height: rh * 0.06,
    justifyContent: 'center',
    margin: rh *0.04
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});
