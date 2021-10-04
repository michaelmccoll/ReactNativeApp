import React from "react";
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./StackNavigator";

import Stats from "../screens/Stats";
import Rater from "../screens/Rater";
import Matches from "../screens/Matches";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator} options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image source={require('../assets/icons/team.png')} style={{width:30, height: 30}} />
          ),
        }}/>
      <Tab.Screen name="Stats" component={Stats} options={{
          tabBarLabel: 'Stats',
          tabBarIcon: () => (
            <Image source={require('../assets/icons/stats.png')} style={{width:30, height: 30}} />
          ),
        }}/>
      <Tab.Screen name="Rater" component={Rater} options={{
          tabBarLabel: 'Rater',
          tabBarIcon: () => (
            <Image source={require('../assets/icons/starFull.png')} style={{width:60, height: 60}} />
          ),
        }}/>
      <Tab.Screen name="Matches" component={Matches} options={{
          tabBarLabel: 'Matches',
          tabBarIcon: () => (
            <Image source={require('../assets/icons/matches.png')} style={{width:30, height: 30}} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image source={require('../assets/icons/profile.png')} style={{width:30, height: 30}} />
          ),
        }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;