import React, { useContext } from "react";
import { View, Text } from "react-native";
import { calendarContext } from "./context";
import {
  getWeeksInMonth,
  startOfMonth,
  endOfMonth,
  format,
  startOfWeek,
  addDays,
  startOfISOWeek
} from "date-fns";
import Week from "./Week";

const Month = () => {
  const { currentDate } = useContext(calendarContext);
  const numberOfWeeks = getWeeksInMonth(currentDate);
  const monthStart = startOfMonth(currentDate);
  const weeks = [];

  for (let index = 0; index < numberOfWeeks; index++) {
    weeks.push(
      <Week
        key={index}
        start={startOfISOWeek(addDays(monthStart, 7 * index))}
      />
    );
  }

  return <View>{weeks}</View>;
};

export default Month;
