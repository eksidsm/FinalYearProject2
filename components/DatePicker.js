import React, {Component} from 'react';
import {Button, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from '../globalStyles';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      open: false,
      maximumDate: new Date(),
      text: 'Enter your Date Of Birth',
    };
  }

  componentDidMount() {
    this.updateMaximumDate();
  }

  updateMaximumDate = () => {
    const today = new Date();
    this.setState({maximumDate: today});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = selectedDate => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    this.setState({
      open: false,
      date: selectedDate,
      text: formattedDate,
    });

    if (this.props.onDOBSelected) {
        this.props.onDOBSelected(formattedDate);
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleOpen} style={[styles.txtInput, {justifyContent: 'center'}]}>
          <Text style={{opacity: 0.65, color: 'grey'}}>{this.state.text}</Text>
          <DatePicker
            modal
            mode="date"
            open={this.state.open}
            date={this.state.date}
            minimumDate={new Date('1900-01-01')}
            maximumDate={this.state.maximumDate}
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          />
        </TouchableOpacity>
      </View>
    );
  }
}