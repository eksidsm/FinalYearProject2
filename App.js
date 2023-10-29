import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './navigation/Tabs'

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    )
  }
}