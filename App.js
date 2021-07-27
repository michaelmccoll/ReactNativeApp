import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import 'react-native-gesture-handler';
import { render } from 'react-dom';

import * as React from 'react';
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
      source={require('/Users/michaelmccoll/projects/expo/my-app/assets/favicon.png')}
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

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }} value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,});
          }}
      />
    </>
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

function RaterScreen({navigation,route}){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Rater Page...</Text>
      <Text>Rater Page...</Text>
      <Text>Rater Page...</Text>
      <Text>Rater Page...</Text>
    </View>
  );
}

function MatchesScreen({navigation,route}){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Matches Page...</Text>
    </View>
  );
}

function ProfileScreen({navigation,route}){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Page...</Text>
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
  return (
    <NavigationContainer>      
      <BottomTabNavigator/>
    </NavigationContainer>
  );
}

export default App;


// *** IMAGE UPLOAD APP ***
// export default function App() {
 
//   const [selectedImage, setSelectedImage] = React.useState(null);

//   let openImagePickerAsync = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
//     if (pickerResult.cancelled === true) {
//       return;
//     }
//     if (Platform.OS === 'web') {
//       let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
//       setSelectedImage({ localUri: pickerResult.uri, remoteUri });
//     } else {
//       setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
//     }
//   };

//   // Button to remove selected image
//   let removeSelectedImage = async () => {
//     setSelectedImage({ selectedImage: null })
//   }

//   let openShareDialogAsync = async () => {
//     if (!(await Sharing.isAvailableAsync())) {
//       alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
//       return;
//     }

//     await Sharing.shareAsync(selectedImage.localUri);
//   };

//   if (selectedImage !== null) {
//     return (
//       <View style={styles.container}>
//         <Image
//           source={{ uri: selectedImage.localUri }} style={styles.thumbnail}/>
//         <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
//           <Text style={styles.buttonText}>Share this photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={removeSelectedImage} style={styles.button}>
//           <Text style={styles.buttonText}>Remove this photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
//           <Text style={styles.buttonText}>Select Another Picture</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo}/>
//         <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>
//         <TouchableOpacity
//           onPress={openImagePickerAsync} style={styles.button}>
//           <Text style={styles.buttonText}>Pick a photo</Text>
//         </TouchableOpacity>
//       </NavigationContainer>
//     </View>
//   );
// }
// *** IMAGE UPLOAD APP ***


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
