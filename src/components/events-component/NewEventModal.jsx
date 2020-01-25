import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { calendarContext } from "../calendar/context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

const NewEventModal = ({ visible, hideModal }) => {
  const { currentDate } = useContext(calendarContext);
  const [isShownStart, showStartPicker] = useState(false);
  const [isShownEnd, showEndPicker] = useState(false);
  const [startDate, setStartDate] = useState("Choose start date");
  const [endDate, setEndDate] = useState("Choose end date");

  const handleStartDateChanging = (date, isStart) => {
    showStartPicker(false);
    showEndPicker(false);
    const setFnc = isStart ? setStartDate : setEndDate;
    setFnc(format(new Date(date), "PP"));
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        presentationStyle="formSheet">
        <View style={styles.container}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={hideModal}>
              <Text>clooooose</Text>
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <Text>Event name:</Text>
              <TextInput placeholder="Enter event name" />
            </View>
            <View style={styles.inputWrapper}>
              <Text>Start:</Text>
              <TouchableOpacity onPress={() => showStartPicker(true)}>
                <Text>{startDate}</Text>
              </TouchableOpacity>
              {isShownStart && (
                <DateTimePicker
                  value={currentDate}
                  onChange={(e, date) => handleStartDateChanging(date, true)}
                />
              )}
            </View>
            <View style={styles.inputWrapper}>
              <Text>End:</Text>
              <TouchableOpacity onPress={() => showEndPicker(true)}>
                <Text>{endDate}</Text>
              </TouchableOpacity>
              {isShownEnd && (
                <DateTimePicker
                  value={currentDate}
                  onChange={(e, date) => handleStartDateChanging(date, false)}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "75%",
    height: "75%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
    shadowColor: "blue",
    shadowOpacity: 0.5
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default NewEventModal;
