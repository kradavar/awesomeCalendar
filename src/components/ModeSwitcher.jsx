import React, { useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import { calendarContext } from "./calendar/context";
import { VIEW_MODES } from "../constants/calendarConstants";

const ModeSwitcher = () => {
  const { mode, setMode } = useContext(calendarContext);
  return (
    <View style={styles.container}>
      <Button
        title={VIEW_MODES.MONTH}
        onPress={() => setMode(VIEW_MODES.MONTH)}
        disabled={mode === VIEW_MODES.MONTH}
      />
      <Button
        title={VIEW_MODES.WEEK}
        onPress={() => setMode(VIEW_MODES.WEEK)}
        disabled={mode === VIEW_MODES.WEEK}
      />
      <Button
        title={VIEW_MODES.DAY}
        onPress={() => setMode(VIEW_MODES.DAY)}
        disabled={mode === VIEW_MODES.DAY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%"
  }
});

export default ModeSwitcher;
