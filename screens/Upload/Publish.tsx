import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
const Publish = () => {
  const [image, setImage] = React.useState(null as any);
  const routeItems : any = useRoute();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: useColorScheme() === "light" ? "#fff" : "#000",
      /*  justifyContent: "center",
      alignItems: "center", */
    },
    containerf2: {
      marginVertical: 35,
      flex: 2,
      alignItems: "center",
      backgroundColor: useColorScheme() === "light" ? "#000" : "#777777",
    },
    containerf3: {
      marginVertical: 35,
      flex: 1,
    },
    addText: {
      fontSize: 20,
      fontWeight: "bold",
      color: useColorScheme() === "light" ? "#000" : "#fff",
      padding: 10,
    },
    placeText: {
      fontSize: 20,
      fontWeight: "bold",
      color: useColorScheme() === "light" ? "#000" : "#fff",
    },
    textInput: {
      backgroundColor: useColorScheme() === "dark" ? "#fff" : "#000",
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      margin: 10,
    },
  });

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height ;
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: routeItems.params?.uri }}
        style={{ width: width, height: height }}
      />
      <View style={styles.containerf3}>
        <Text style={styles.placeText}>Description</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          maxLength={256}
          placeholder="What do you think"
        />
        <Text style={styles.placeText}>Location</Text>
        <TextInput
          style={styles.textInput}
          multiline={false}
          maxLength={256}
          placeholder="Location"
        />
        <View style={{ alignItems: "baseline" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 15,
              borderRadius: 19,
              marginHorizontal: 10,
            }}
          >
            <Text style={styles.addText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Publish;
