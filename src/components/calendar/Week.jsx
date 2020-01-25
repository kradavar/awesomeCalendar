import React from "react";
import { View, StyleSheet } from "react-native";
import { format, addDays } from "date-fns";
import Day from "./Day";

const Week = ({ start }) => {
  const days = [];

  for (let index = 0; index < 7; index++) {
    days.push(<Day key={index} date={addDays(start, 1 * index)} />);
  }

  return <View style={styles.week}>{days}</View>;
};

const styles = StyleSheet.create({
  week: {
    display: "flex",
    flexDirection: "row"
  }
});

export default Week;
