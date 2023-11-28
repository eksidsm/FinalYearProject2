import {Dimensions, ImageBackground, Text, View} from 'react-native';
import React, {Component} from 'react';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class EmployeeScreen extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{width: rw, height: rh}}>
          <Text style={{padding: 50}}>Employee Register Screen</Text>
        </ImageBackground>
      </View>
    );
  }
}