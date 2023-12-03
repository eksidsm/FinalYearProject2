import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MyContext from './myContext';

export default class MyProvider extends Component {
  state = {
    name: '',
    emailAddress: '',
    dateofb: '',
  };

  setName = newName => {
    this.setState({name: newName});
    console.log('name in provider is ', this.state.name);
  };

  setEmail = newEmail => {
    this.setState({emailAddress: newEmail});
  };

  setDOB = newDOB => {
    this.setState({dateofb: newDOB});
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          name: this.state.name,
          setName: this.setName,
          emailAddress: this.state.emailAddress,
          setEmail: this.setEmail,
          dateofb: this.state.dateofb,
          setDOB: this.setDOB,
        }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}