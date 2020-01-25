import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";

const Day = ({ date }) => {
  return (
    <View style={styles.dayContainer}>
      <TouchableOpacity onPress={() => alert(format(date, "dd"))}>
        <Text>{format(date, "dd")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "blue",
    width: "13%"
  }
});

export default Day;
