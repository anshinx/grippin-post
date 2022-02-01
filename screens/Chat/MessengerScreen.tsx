import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { db } from "../../firebase";
import ChatProp from "../../contents/ChatProp";

const MessengerScreen = () => {
  const { currentUser } = useAuth();
  const [chatUsers, setChatUsers] = useState([] as any);
  const navigation: any = useNavigation();

  navigation.setOptions({
    headerShown: true,
    title: currentUser.username,
  });

  useEffect(() => {
    currentUser?.chatWith.forEach((chatWith: any) => {
      getDoc(doc(db, `users/${chatWith}`)).then((user: any) => {
        setChatUsers((chatUsers: []) => [...chatUsers, user.data()]);
      });
    });
    console.log(chatUsers);
  }, []);

  return (
    <View>
      <FlatList
        data={chatUsers}
        renderItem={(chatUsers: any) => (
          <ChatProp username={""} profilePic={chatUsers.photoURL} />
        )}
      />
    </View>
  );
};

export default MessengerScreen;
