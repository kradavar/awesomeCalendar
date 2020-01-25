import React from "react";
import { StyleSheet, View } from "react-native";

import CalendarContextProvider from "./src/components/calendar/context";
import CalendarContainer from "./src/components/calendar/CalendarContainer";
import ModeSwitcher from "./src/components/ModeSwitcher";
import ChangeDateButtons from "./src/components/navigation/ChangeDateButtons";

export default function App() {
  return (
    <View style={styles.container}>
      <CalendarContextProvider>
        <ModeSwitcher />
        <ChangeDateButtons />
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
