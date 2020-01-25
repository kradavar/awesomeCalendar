import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { calendarContext } from "./context";
import { VIEW_MODES } from "../../constants/calendarConstants";
import Hour from "./Hour";

const Day = ({ date }) => {
  const { mode } = useContext(calendarContext);
  const isMonthMode = mode === VIEW_MODES.MONTH;
  const hours = [];

  for (let index = 0; index < 24; index++) {
    hours.push(<Hour key={index} hour={index} />);
  }

  return (
    <View
      style={{
        ...styles.dayContainer,
        width: mode === VIEW_MODES.DAY ? "85%" : "13%"
      }}>
      {isMonthMode ? (
        <TouchableOpacity onPress={() => alert(format(date, "dd"))}>
          <Text>{format(date, "dd")}</Text>
        </TouchableOpacity>
      ) : (
        hours
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "blue"
  }
});

export default Day;
