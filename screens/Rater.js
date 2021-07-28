import React from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";

const Rater = ({ navigation, route }) => {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline placeholder="What's on your mind?"
        style={{ height: 100, padding: 10, margin: 20, backgroundColor: 'white' }} value={postText}
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
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Rater;