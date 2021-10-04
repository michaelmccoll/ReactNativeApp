import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import { render } from 'react-dom';

import * as React from 'react';
import {useState,useEffect} from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator } from "./navigation/StackNavigator";
import BottomTabNavigator from "./navigation/TabNavigator";

// To  add delay to splash screen
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 3000);


function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('./assets/PlayerRaterLogo.png')}
    />
  );
}

function HomeScreen({navigation,route}) {
  React.useEffect(() => {if (route.params?.post){}}, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Create post" onPress={() => navigation.navigate('CreatePost')}/>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      
      <Button title="Go to Details" onPress={() => navigation.navigate('Details',
          {itemId: 86,
          otherParam: 'anything you want here',})}/>
    </View>
  );
}



function DetailsScreen({route, navigation}) {
  const {itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button title="Go to Details... again" onPress={() => navigation.push('Details',{
            itemId: Math.floor(Math.random() * 100)})}/>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
      <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()}/>
      <Button title="Go back" onPress={() => navigation.goBack()}/>
    </View>
  );
}

function StatsScreen({navigation,route}){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Stats Page...</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function App() {

  const [teamSelect, setTeamSelect] = React.useState(null)
  const [playerSelect, setPlayerSelect] = React.useState(0)
  const [teams, setTeams] = React.useState([])
  const [players, setPlayers] = React.useState([])
  const [latestMatch, setLatestMatch] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)

  const getTeams = () => {
    fetch(`http://player-rater.herokuapp.com/teams`)
    .then(res => res.json())
    .then(data => {
      setTeams(data)
      // setTeamSelect(data[0])
    })
    .then(() => setLoaded(true))
}

  const getPlayers = () => {
      fetch(`http://player-rater.herokuapp.com/players`)
      .then(res => res.json())
      .then(data =>{
        setPlayers(data)
        // setPlayerSelect(data[0])
      } )
      .then(() => setLoaded(true))
  }

  useEffect(()=>{
    getTeams();
    getPlayers();
  },[])

  useEffect(() => {
    if (teamSelect) {
      getLatestMatch()
    }
  }, [teamSelect, teams])

  const getTeam = (selectedTeam) => {
    for (const team of teams ) {
      if (team.id == selectedTeam) {
        setTeamSelect(team)
      }
    }
  }

  // Fetches the team selected's last match
  const getLatestMatch = () => {
    if (teamSelect) {
      const match = teamSelect.matches.slice(-1)[0]
      console.log(match)
      setLatestMatch(match)
    }
  }

  // Fetches the player selected
  const getPlayer = (selectedPlayer) => {
    for (const player of players ) {
      if (player.id == selectedPlayer) {
        setPlayerSelect(player)
      }
    }
  }
  
  return (
    <NavigationContainer>      
      <BottomTabNavigator/>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
