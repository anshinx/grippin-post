import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import UseTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const navigation: any = useNavigation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  navigation.setOptions({
    headerShown: true,
    headerTitleAlign: "center",
    title: "Welcome to Grippin' Posts",
  });

  const { signInWithGoogle, signInWithMailAndPass } = useAuth();

  const handleLoginWithEmailAndPass = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: useColorScheme() == "dark" ? "#000" : "#fff",
      /*     alignItems: "center",
      justifyContent: "center", */
    },
    container2: {
      marginTop: "10%",
      flex: 0.5,

      backgroundColor: useColorScheme() == "dark" ? "#000" : "#fff",
    },
    loginButton: {
      position: "relative",
      backgroundColor: "#0000fa",
      borderRadius: 25,
      width: "75%",
      flexDirection: "row",
      margin: 5,
      marginTop: 50,
    },
    loginText: {
      fontSize: 22,
      fontWeight: "bold",
      margin: 12,
      color: "white",
    },
    LoginButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      margin: 12,
      marginHorizontal: 22,
      color: "white",
    },
    textInput: {
      backgroundColor: "white",
      height: 40,
      margin: 10,
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 10,
    },
    textLite: {
      marginStart: 19,
      fontSize: 12,
      fontWeight: "bold",
      color: useColorScheme() == "light" ? "#000" : "#fff",
    },
    textLiteRegister: {
      marginStart: 19,
      fontSize: 14,
      fontWeight: "bold",
      color: useColorScheme() == "light" ? "#000" : "#fff",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.textLite}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        <Text style={styles.textLite}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.textLiteRegister}>Already Here? LogIn!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            backgroundColor: "green",
            marginEnd: 21,
            borderRadius: 25,
          }}
          onPress={handleLoginWithEmailAndPass}
        >
          <Text style={styles.LoginButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            signInWithGoogle();
          }}
        >
          <SimpleLineIcons
            name="social-google"
            size={35}
            color="white"
            style={{ marginVertical: 10, marginStart: 10 }}
          />
          <Text style={styles.loginText}> Register With Google </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
