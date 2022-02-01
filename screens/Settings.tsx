import React from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "../hooks/useAuth";

const Settings = () => {
    const { logout } = useAuth();
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0000FF",
    borderRadius: 25,
    width: "75%",
    flexDirection: "row",
    margin: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 36,
    color: "white",
  },
});
