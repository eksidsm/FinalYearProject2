import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './navigation/Tabs'
import MyProvider from './context/myProvider';
import auth from '@react-native-firebase/auth'

export default class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     user: null,
  //   }
  // }
  //  async componentDidMount() {
  //   this.logged = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({user});
  //       console.log('USer logged in: ', user.uid);
  //     } else {
  //       this.setState({user: null});
  //       console.log('NO user logged in found');
  //     }})
  //   }

  render() {
    return (
      <MyProvider>
        <NavigationContainer>
        <StackNav />
      </NavigationContainer>
      </MyProvider>
      
    )
  }
}