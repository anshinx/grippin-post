import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  SectionList,
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

// End of Imports -ANCHOR

export default function App() {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(true);
  const [loadingForPhotos, setLoadingForPhotos] = useState(true);
  const [hasPermission, setHasPermission] = useState(null as any);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const { colors } = useTheme();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  //Dropdown Values SECTION
  const [value, setValue] = useState(null as any);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([] as any);
  const [photoData, setPhotoData] = useState([] as any);
  var albums, items;
  const [selectedImage, setSelectedImage] = useState(null as any);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      if (status?.granted == false && status?.canAskAgain == true) {
        requestPermission();
      } else if (status?.granted == false && status?.canAskAgain == false) {
        return null;
      } else {
        const { assets } = await MediaLibrary.getAssetsAsync({
          first: 100,
          mediaType: MediaLibrary.MediaType.photo,
        });
        albums = await MediaLibrary.getAlbumsAsync();
        let items = albums.map((album) => {
          return {
            label: album.title,
            value: album.id,
          };
        });

        if (items == null) {
          return null;
        } else {
          setData(items);
          setLoading(false);
        }
      }
    })();
    (async () => {
      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 100,
        mediaType: MediaLibrary.MediaType.photo,
        album: value,
      });
      setPhotoData(assets);
      setLoadingForPhotos(false);
    })();
  }, [status, value]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const width = Dimensions.get("window").width - 40 / 3;
  const CamerWidth = Dimensions.get("window").width;
  const height = Dimensions.get("window").height / 4;
  const CameraHeight = Dimensions.get("window").height - 75;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      width: CamerWidth,
      height: CameraHeight,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "row",
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    buttonRecord: {
      position: "absolute",
      bottom: 0,
      right: 178,
    },
    text: {
      fontSize: 18,
      color: "white",
    },
    containerf2: {
      marginVertical: 35,

      alignItems: "center",
    },
    containerf3: {
      marginVertical: 35,
      flex: 1,
    },
    addText: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 10,
      color: colors.text,
    },
    placeText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    textInput: {
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      margin: 10,
    },
  });

  return (
    <View style={styles.container}>
      {!loading ? (
        <DropDownPicker
          placeholder="Select Album"
          open={open}
          value={value}
          items={data}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setData}
        />
      ) : null}
      <View style={styles.containerf3}>
        {!loading ? (
          <FlatList
            numColumns={3}
            data={photoData}
            ListHeaderComponent={
              selectedImage != null ? (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={{ width: width, height: height }}
                />
              ) : null
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.containerf2}
                onPress={() => {
                  setSelectedImage(item);
                }}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: width / 3, height: height }}
                />
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>
      {selectedImage ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
          onPress={() => {
            navigation.navigate("Publish", selectedImage);
          }}
        >
          <AntDesign name="rightcircle" size={50} color={colors.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
