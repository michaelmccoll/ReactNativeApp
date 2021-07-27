import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle}}>
      <Stack.Screen name="PlayerRater" component={Home}/>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };