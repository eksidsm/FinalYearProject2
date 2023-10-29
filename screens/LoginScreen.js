import { Text, View, StyleSheet, ImageBackground, Dimensions, TextInput, Image, TouchableOpacity, Alert} from 'react-native'
import React, { Component } from 'react'
import styles from '../globalStyles'
import { ScrollView } from 'react-native-gesture-handler';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass: '',
    }
  }
  handleLogin = () => {
    console.log(this.state.email);
    console.log(this.state.pass);
    if(this.state.email === 'admin' && this.state.pass === 'admin'){
      this.props.navigation.navigate('Tabs2');
    } else if(this.state.email === 'user' && this.state.pass === 'user'){
      this.props.navigation.navigate('Tabs');
    } else {
      Alert.alert('Error', 'Incorrect Username or Password');
    }
  }

  handleEmail = newEmail => {
    this.setState({email: newEmail});
  }

  handlePass = newPass => {
    this.setState({pass: newPass});
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require('../assets/bg2.jpg')} style={styles.bgImg}>
            <Image source={require('../assets/review.png')} style={{alignSelf: 'center', width: rw * 0.6, height: rh * 0.35}}/>
            <Text style={{fontSize: 32, textAlign: 'center', color: 'white'}}>Welcome</Text>
            <Text style={{paddingHorizontal: 30, fontSize: 20, marginTop: 10, color: 'white'}}>Add Reviews, Track Your Performance, Enhance Your Profile and Experience & more</Text>
            <View style={{marginTop: 30}}>
            <TextInput 
            placeholder='Email Address'
            style={styles.txtInput}
            onChangeText={this.handleEmail}/>
            <TextInput 
            secureTextEntry={true}
            placeholder='Password'
            style={styles.txtInput}
            onChangeText={this.handlePass}/>
            </View>

            <TouchableOpacity style={styles.opc} onPress={this.handleLogin}>
                <Text style={{textAlign: 'center', fontSize: 20}}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: rh * 0.04}}>
            <Text style={{color: 'grey', fontSize: 12}}>For New Users, please visit our website for more informations about creating an account for your franchise.</Text>
           
            </View>
        </ImageBackground>
      </ScrollView>
    )
  }
}