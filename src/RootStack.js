import React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SignInScreen from './Screen/SignInScreen'
import SignUpScreen from './Screen/SignUpScreen'
import ChangePass from './Screen/ChangePass'

import HGScreen from './Screen/HGScreen'
import StatisticsScreen from './Screen/StatisticsScreen'
import InforScreen from './Screen/InforScreen';
import Bag from './Screen/Bag'
import OrderScreen from './Screen/OrderScreen'

const Tab = createMaterialBottomTabNavigator();
const HomeScreen = () => {
  return (
    
    <Tab.Navigator
      initialRouteName="HGScreen"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "#8A388F" }}
      barStyle={{ backgroundColor: '#8A388F' }}
      
    >
      <Tab.Screen
        name="HGScreen"
        component={HGScreen}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="InforScreen"
        component={InforScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen 
      options={{headerShown: false}}
      name="SignInScreen" component={SignInScreen} />
      <Stack.Screen 
      options={{headerShown: false}}
      name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen 
      options={{headerShown: false}}
      name="ChangePass" component={ChangePass} />
      <Stack.Screen 
        
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="OrderScreen" 
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen 
        name="Bag" 
        component={Bag}
        options={{
          headerShown: false,
        }}
        />
    </Stack.Navigator>
  );
};

export default function RootStack() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
