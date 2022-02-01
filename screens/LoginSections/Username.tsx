import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import { db } from "../../firebase";
const Username = () => {
  const navigation: any = useNavigation();
  /* navigation.setOptions({
    headerShown: false,
  }); */
  const { currentUser } = useAuth();
  const [username, setUsername] = React.useState("");
  const handleSubmitUser = () => {
    if (username.length > 0) {
      updateDoc(doc(db, `users/${currentUser?.uid}`), {
        username: username,
      }).then(() => {
        currentUser.username = username;
        navigation.navigate("MainScreen");
      });
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: "50%",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
          Username
        </Text>
        <TextInput
          style={{
            backgroundColor: "white",
            width: "80%",
            marginHorizontal: 10,
            borderColor: "blue",
            borderRadius: 20,
            borderWidth: 2,
            padding: 10,
          }}
          value={username}
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "lightblue",
            paddingHorizontal: 20,
            marginTop: 10,
            borderRadius: 12,
            marginLeft: "auto",
            marginRight: "10%",
          }}
          onPress={() => {
            handleSubmitUser();
          }}
        >
          <MaterialIcons name="navigate-next" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Username;

const styles = StyleSheet.create({});
