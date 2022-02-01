import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import Post from "../contents/Post/PostInMainScreen";
import { db } from "../firebase";
import UseTheme from "../hooks/useTheme";

const MainScreen = () => {
  const { color } = UseTheme();
  const [jsonData, setJsonData] = useState([] as any);
  const navigation: any = useNavigation();
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setJsonData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);
  const memoizedData = React.useMemo(() => jsonData, [jsonData]);

  return (
    <View style={{ backgroundColor: useColorScheme() === "dark" ? "#000" : "#fff" }}>
      <FlatList
        data={memoizedData}
        renderItem={({ item }) => <Post post={item} />}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
