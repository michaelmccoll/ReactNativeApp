import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Rater = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Rater screen</Text>
    </View>
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