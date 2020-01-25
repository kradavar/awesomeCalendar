import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CalendarContextProvider from "./src/components/calendar/context";
import CalendarContainer from "./src/components/calendar/CalendarContainer";
import ModeSwitcher from "./src/components/ModeSwitcher";

export default function App() {
  return (
    <View style={styles.container}>
      <CalendarContextProvider>
        <ModeSwitcher />
        <CalendarContainer />
      </CalendarContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "10%"
  }
});
