import { View, Text } from "react-native";
import React from "react";

const ChatProp = ({
  username,
  profilePic,
}: {
  username: string;
  profilePic: string;
}) => {
  return (
    <View style={{ flex: 1 }} key={Math.random()}>
      <Text style={{ fontSize: 21, backgroundColor: "black", color: "white" }}>
        {username}
      </Text>
    </View>
  );
};

export default ChatProp;
