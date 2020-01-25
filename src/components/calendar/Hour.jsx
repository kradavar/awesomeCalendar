import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Hour = ({ hour }) => {
  return (
    <View>
      <TouchableOpacity>
        <Text>{hour}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Hour;
