import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Hour = ({ hour, isMonday }) => {
  return (
    <View
      style={{
        ...styles.container,
        borderTopWidth: hour === 0 ? 0 : 1
      }}>
      <TouchableOpacity onPress={() => alert("hey")}>
        <Text>{hour}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "blue"
  }
});

export default Hour;
