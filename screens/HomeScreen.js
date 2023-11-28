import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {Component} from 'react';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class HomeScreen extends Component {
  handlePlus = () => {
    this.props.navigation.navigate('FormScreen');
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{height: rh, width: rw}}>
          <SafeAreaView style={styles.header}>
            <Text style={{fontSize: rh * 0.03}}>Welcome Username</Text>
          </SafeAreaView>

          <Text style={styles.title}>Add A Review</Text>
          <TouchableOpacity onPress={this.handlePlus}>
            <View style={styles.add}>
              <Image
                source={require('../assets/plus.png')}
                style={styles.plus}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    width: rw,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: rh * 0.045,
    textAlign: 'center',
    color: 'white',
    marginTop: rh * 0.2,
  },
  add: {
    width: rw * 0.4,
    height: rh * 0.2,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: rh * 0.09,
  },
  plus: {
    height: rh * 0.19,
    width: rw * 0.19,
  },
});