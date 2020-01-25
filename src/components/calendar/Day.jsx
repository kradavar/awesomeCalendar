import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  format,
  isSunday,
  isSameISOWeek,
  endOfMonth,
  isMonday
} from "date-fns";
import { calendarContext } from "./context";
import { VIEW_MODES } from "../../constants/calendarConstants";
import Hour from "./Hour";

const Day = ({ date }) => {
  const { mode, currentDate } = useContext(calendarContext);
  const isMonthMode = mode === VIEW_MODES.MONTH;
  const isDayMode = mode === VIEW_MODES.DAY;
  const isLastWeekOfMonth = isSameISOWeek(date, endOfMonth(currentDate));
  const hours = [];

  for (let index = 0; index < 24; index++) {
    hours.push(<Hour key={index} hour={index} isMonday={isMonday(date)} />);
  }

  return (
    <View
      style={{
        ...styles.dayContainer,
        width: isDayMode ? "85%" : "14%",
        borderRightWidth: !isDayMode && !isSunday(date) ? 0 : 1,
        borderBottomWidth: isMonthMode && !isLastWeekOfMonth ? 0 : 1
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
