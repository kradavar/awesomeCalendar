import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Button = ({ name, action }) => {
  return (
    <View>
      <TouchableOpacity onPress={action}>
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
