import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewEventButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => alert("add event")}
        style={styles.buttonWrapper}>
        <FontAwesomeIcon icon={faPlus} style={styles.plusButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 36,
    width: "100%",
    marginRight: 50
  },
  plusButton: {
    color: "white"
  },
  buttonWrapper: {
    borderRadius: 50,
    backgroundColor: "blue",
    padding: 10
  }
});

export default NewEventButton;
