import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

class AdminHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    const user = auth().currentUser;
    if (user) {
      const adminUid = user.uid;
      console.log('admin uid is: ', adminUid);
      this.fetchEmployees(adminUid);
    }
  }

  fetchEmployees = async (adminUid) => {
    try {
      console.log('uid sent is', adminUid);
      const employeesCollection = await firestore()
        .collection('admins')
        .doc(adminUid)
        .collection('employees')
        .get();

      const employeeList = employeesCollection.docs.map((employeeDoc) => {
        const employeeData = employeeDoc.data();
        return {
          id: employeeDoc.id,
          name: employeeData.name,
          fullName: employeeData.employeeName,
        };
      });

      this.setState({ employees: employeeList });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  render() {
    const { employees } = this.state;

    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{ width: rw, height: rh }}>
          <SafeAreaView style={styles.header}>
            <Text>Check and Track your employees</Text>
            <Text>If they are none, check Register page and add them!</Text>
          </SafeAreaView>
          {employees.map((employee) => (
            <TouchableOpacity
              key={employee.id}
              style={styles.singleElement}
              onPress={() => this.props.navigation.navigate('AdminUserView', { employeeId: employee.id })}
            >
              <Text style={{ paddingHorizontal: rw * 0.03, fontSize: 18 }}>
                Name: {employee.fullName}
              </Text>
              <Text style={{ paddingHorizontal: rw * 0.03, fontSize: 18 }}>
                ID: {employee.id}
              </Text>
            </TouchableOpacity>
          ))}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: rw,
    backgroundColor: 'white',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    height: rh * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleElement: {
    width: rw * 0.9,
    height: rh * 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: rw * 0.05,
    marginTop: rh * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminHomeScreen;
