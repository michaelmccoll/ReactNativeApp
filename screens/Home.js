import React from "react";
import { View, Button, Text,StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

const Home = () => {
  const [selectedTeam, setSelectedTeam] = React.useState('');
    return (
      <Picker
        selectedTeam={selectedTeam}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedTeam(itemValue)
        }>
        <Text>Select Team</Text>
        <Picker.Item label="Hibs" value="hibs" />
        <Picker.Item label="Hearts" value="hearts" />
      </Picker>
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

export default Home;