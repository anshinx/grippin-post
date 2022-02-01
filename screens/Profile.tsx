import { useTheme } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { currentUser } = useAuth();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    profilePic: {
      width: 80,
      height: 80,
      borderRadius: 80,
      borderWidth: 3,
      borderColor: colors.background,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.background,
    },
    profileContainer: {
      margin: 10,
      flexDirection: "row",
    },
    postsContainer: {
      flex: 1,
      backgroundColor: colors.card,
    },
    followoring: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    counter: {
      fontSize: 20,
      fontWeight: "100",
      color: colors.text,
    },
  });

  console.log(currentUser)



  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: currentUser.photoURL }}
          style={styles.profilePic}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              paddingStart: 50,
              paddingHorizontal: 40,
            }}
          >
            <Text style={styles.followoring}>Follower</Text>
            <Text style={styles.counter}>100 </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.followoring}>Following </Text>
            <Text style={styles.counter}>100 </Text>
          </View>
        </View>
      </View>
      <View style={styles.postsContainer}>
          
      </View>
    </View>
  );
};

export default Profile;
