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
import React, {Component} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

const list = [
  {key: '1', value: 'Recent Reviews'},
  {key: '2', value: 'By Waiters'},
];

class ByDate extends Component {
  render() {
    return (
      <View style={styles.reviewsByDateTime}>
        <Text>Reviews By Date and Time</Text>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Date&Time: 11 January 2021 - 9am
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Date&Time: 10 January 2021 - 11pm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Date&Time: 10 January 2021 - 7pm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Date&Time: 10 January 2021 - 2pm
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class ByWaiter extends Component {
  render() {
    return (
      <View style={styles.reviewsByWaiters}>
        <Text>Reviews By waiters</Text>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Last 10 Reviews Stars Average: 99.-98y098g087g087g087g7
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Last 10 Reviews Stars Average: 4.5
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Last 10 Reviews Stars Average: 4.0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleElement}>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Review for Waiter A
          </Text>
          <Text style={{paddingHorizontal: rw * 0.03, fontSize: 18}}>
            Last 10 Reviews Stars Average: 3.3
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class AdminHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Recent Reviews',
    };
  }

  setSelected = newval => {
    this.setState({selected: newval});
    console.log(this.state.selected);
  };

  render() {
    const {selected} = this.state;

    let componentToRender = null;

    switch (selected) {
      case 'Recent Reviews':
        componentToRender = <ByDate />;
        break;
      case 'By Waiters':
        componentToRender = <ByWaiter />;
        break;
      default:
        componentToRender = null;
        break;
    }
    return (
      <View>
        <ImageBackground
          source={require('../assets/bg2.jpg')}
          style={{width: rw, height: rh}}>
          <SafeAreaView style={styles.header}>
            <SelectList
              setSelected={this.setSelected}
              data={list}
              save="value"
            />
          </SafeAreaView>

          {componentToRender}
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
  },
  singleElement: {
    width: rw * 0.9,
    height: rh * 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: rw * 0.05,
    marginTop: rh * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewsByDateTime: {
    marginTop: rh * 0.03,
  },
  reviewsByWaiters: {
    marginTop: rh * 0.06,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});