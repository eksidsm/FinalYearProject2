import { Dimensions, ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import styles from '../globalStyles'

const rh = Dimensions.get("window").height;
const rw = Dimensions.get('window').width;

export default class FormScreen extends Component {
  handleContinue = () => { 
    this.props.navigation.navigate("RecordScreen")
  }
  render() {
    return (
      <View>
        <ImageBackground source={require('../assets/bg2.jpg')} style={{width: rw, height: rh}}>
            <View style={styles2.header}>
            <Text style={styles2.title}>Please fill out this form to be able to proceed</Text>
            </View>

            <View style={{marginTop: rh * 0.03}}>
            <Text style={styles.txt}>Email of the customer: *</Text>
            <TextInput 
            style={styles.txtInput}
            placeholder='Enter your Email Address'/>
            <Text style={styles.txt}>Name of the customer: *</Text>
            <TextInput 
            style={styles.txtInput}
            placeholder='Enter your Full Name'/>
            <Text style={styles.txt}>Phone Number of the customer: *</Text>
            <TextInput 
            style={styles.txtInput}
            placeholder='Enter your Phone Number'/>
            <Text style={styles.txt}>Message(Optional):</Text>
            <TextInput 
            style={{
                width: rw * 0.8,
                height: rh * 0.09,
                borderRadius: 10,
                backgroundColor: 'lightgrey',
                alignSelf: 'center',
                marginTop: rh * 0.019, 
                paddingHorizontal: rw * 0.06,}}
            placeholder='Any notes?'
            multiline/>
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
})