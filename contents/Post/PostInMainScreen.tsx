import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { db } from "../../firebase";
//import { findUserDataFromUid } from "../../hooks/findUserDataFromUid";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const Post = (props: any) => {
  const { post } = props;
  const { colors } = useTheme();

  //* GET USER DATA SECTION
  const [postUser, setPostUser] = useState({} as any);
  useEffect(() => {
    getDoc(doc(db, "users", post.user)).then((sender) => {
      setPostUser(sender.data());
    });
  }, []);
  //! GET USER DATA END
  return (
    <View
      key={post.id}
      style={{
        backgroundColor: colors.card,
        borderRadius: 1,
        
        borderColor: colors.card,
        borderBottomWidth:10,
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: postUser?.photoURL }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            borderColor: "red",
            borderWidth: 3,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginTop: 5,
            color: colors.text,
          }}
        >
          {" "}
          {postUser.username}
        </Text>
        <TouchableOpacity style={{ marginLeft: "auto", marginTop: 5 }}>
          <Entypo name="dots-three-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: post.image }}
        style={{
          width: "100%",
          height: 300,
        }}
      />
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <TouchableOpacity style={styles.postButtons}>
          <FontAwesome5 name="heart" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButtons}>
          <FontAwesome5 name="comment" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <Text style={{ color: colors.text }}>
        <Text style={{ fontWeight: "bold" }}>{postUser.displayName} </Text>
        {post.title}
      </Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postButtons: {
    marginHorizontal: 5,
  },
});

/*

Post Object
 {
  "createdAt": Object {
    "nanoseconds": 690000000,
    "seconds": 1640279028,
  },
  "id": "pMYKc1Mcpds720hs3S3C",
  "image": "https://firebasestorage.googleapis.com/v0/b/node-103.appspot.com/o/posts%2FsyKpGkFF1kUDk24NK4n7pPQjbAG3%2Fimage7.398923556852484jpg?alt=media&token=ffb7259c-2ae7-4665-935d-cdc436c41531",
  "likes": Array [
    "NrNVe6HaKwaXkdYP0uoJWGKtECx2",
    "XrHrxPhNteVdk3IdpVgdW6ylPci1",
  ],
  "title": "Başlık",
  "user": "syKpGkFF1kUDk24NK4n7pPQjbAG3",
} */
