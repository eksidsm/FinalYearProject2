import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

const rh =  Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class AdminHomeScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground source={require('../assets/bg2.jpg')} style={{width: rw, height: rh} }>
          <View style={styles.header}><Text>Dropdown menu to sort between most recent reviews and waiters list</Text>

          <View style={styles.reviewsByDateTime}>
          <Text>Reviews By Date and Time</Text>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Date&Time: 11 January 2021 - 9am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Date&Time: 10 January 2021 - 11pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Date&Time: 10 January 2021 - 7pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Date&Time: 10 January 2021 - 2pm</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewsByWaiters}>
          <Text>Reviews By waiters</Text>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Last 10 Reviews Stars Average: 4.7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Last 10 Reviews Stars Average: 4.5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Last 10 Reviews Stars Average: 4.0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleElement}>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Review for Waiter A</Text>
              <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>Last 10 Reviews Stars Average: 3.3</Text>
            </TouchableOpacity>
          </View>

          </View>
        </ImageBackground>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: rh * 0.07,
    width: rw ,
    backgroundColor: 'white',
  },
  singleElement: {
    width: rw * 0.9,
    height: rh *0.1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: rw * 0.05,
    marginTop: rh * 0.02,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewsByDateTime: {
    marginTop: rh * 0.06,
  },
  reviewsByWaiters: {
    marginTop: rh * 0.06,
  },
  scrollContainer: {
    flexGrow: 1
  }
})