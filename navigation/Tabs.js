import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import FormScreen from '../screens/FormScreen';
import RecordScreen from '../screens/RecordScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AdminHomeScreen from '../screens/AdminHomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class StackNav extends Component{
    render(){
        return (
        <Stack.Navigator>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Tabs' component={Tabs} options={{headerShown: false}}/>
            <Stack.Screen name='Tabs2' component={Tabs2} options={{headerShown: false}} />
            <Stack.Screen name='FormScreen' component={FormScreen} options={{headerShown: false}}/>
            <Stack.Screen name='RecordScreen' component={RecordScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
        )
    }
}

class Tabs extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: rh * 0.03,
            backgroundColor: 'white',
            borderRadius: 15,
            height: rh * 0.09,
            width: rw * 0.93,
            left: rw * 0.038,
            ...styles.shadow,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center', }}>
                <Image
                  source={focused ? require('../assets/homec.png') : require('../assets/home.png')}
                  resizeMode="contain"
                  style={{
                    width: rw * 0.08,
                    height: rh *0.05,
                  }}
                />
                <Text style={{color: focused ? 'black' : 'grey', fontWeight: focused ? 'bold' : 'null'}}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                  <Image
                    source={focused ? require('../assets/userc.png') : require('../assets/user.png')}
                    resizeMode="contain"
                    style={{
                      width: rw * 0.08,
                      height: rh * 0.05,
                    }}
                  />
                  <Text style={{color: focused ? 'black' : 'grey', fontWeight: focused ? 'bold' : 'null'}}>Profile</Text>
                </View>
              ),
        }}
        />
      </Tab.Navigator>
    );
  }
}

class Tabs2 extends Component {
    render(){
        return (
            <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: rh * 0.03,
            backgroundColor: 'white',
            borderRadius: 15,
            height: rh * 0.09,
            width: rw * 0.93,
            left: rw * 0.038,
            ...styles.shadow,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={AdminHomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center', }}>
                <Image
                  source={focused ? require('../assets/homec.png') : require('../assets/home.png')}
                  resizeMode="contain"
                  style={{
                    width: rw * 0.08,
                    height: rh *0.05,
                  }}
                />
                <Text style={{color: focused ? 'black' : 'grey', fontWeight: focused ? 'bold' : 'null'}}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                  <Image
                    source={focused ? require('../assets/userc.png') : require('../assets/user.png')}
                    resizeMode="contain"
                    style={{
                      width: rw * 0.08,
                      height: rh * 0.05,
                    }}
                  />
                  <Text style={{color: focused ? 'black' : 'grey', fontWeight: focused ? 'bold' : 'null'}}>Profile</Text>
                </View>
              ),
        }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                  <Image
                    source={focused ? require('../assets/add-userc.png') : require('../assets/add-user.png')}
                    resizeMode="contain"
                    style={{
                      width: rw * 0.08,
                      height: rh * 0.05,
                    }}
                  />
                  <Text style={{color: focused ? 'black' : 'grey', fontWeight: focused ? 'bold' : 'null'}}>Register</Text>
                </View>
              ),
        }}
        />
      </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: rh * 0.01,
    },
  },
});