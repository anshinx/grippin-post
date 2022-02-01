import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginSections/LoginScreen";
import MessengerScreen from "./screens/Chat/MessengerScreen";
import Settings from "./screens/Settings";
import UploadPost from "./screens/Upload/UploadPost";
import useAuth from "./hooks/useAuth";
import {
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Route, useNavigation, useTheme } from "@react-navigation/native";
import Profile from "./screens/Profile";
import Username from "./screens/LoginSections/Username";
import Register from "./screens/LoginSections/Register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Publish from "./screens/Upload/Publish";
import Search from "./screens/Search";
import { Ionicons } from "@expo/vector-icons";


const MainStack = () => {
  const Tab = createBottomTabNavigator();
  const { logout } = useAuth();
  const navigation = useNavigation();

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-search-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: "User+",
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 8 }}
                onPress={() => {
                  navigation.navigate({ key: "UsernameChanger" });
                }}
              >
                <MaterialIcons name="settings" size={24} color={"white"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 8 }}
                onPress={() => {
                  logout();
                }}
              >
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoginStack = () => {
  const { colors } = useTheme();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Username" component={Username} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { colors } = useTheme();
  const Stack = createNativeStackNavigator();

  if (useAuth().isLoggedIn) {
    return (
      <Stack.Navigator
        initialRouteName="Gripprr"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen
          name="Main Screen"
          component={MainStack}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => HeaderWidgets(route),
          })}
        />
        <Stack.Screen
          name="MessengerScreen"
          component={MessengerScreen}
          options={{
            title: "Messenger",
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 8 }}
                  onPress={() => {
                    useAuth().logout();
                  }}
                >
                  <MaterialIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="UploadPost"
          component={UploadPost}
          options={{
            title: "Upload Post",
          }}
        />
        <Stack.Screen
          name="Publish"
          component={Publish}
          options={{
            title: "Publish",
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="Gripprr"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: useColorScheme() == "dark" ? "#000" : "#fff",
          },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen name="Login" component={LoginStack} />
      </Stack.Navigator>
    );
  }
};

export default StackNavigator;

function getHeaderTitle(route: Partial<Route<string, object | undefined>>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  const { currentUser } = useAuth();
  switch (routeName) {
    case "Feed":
      return "Grippin' Posts";
    case "Profile":
      return currentUser.username;
    case "Add Post":
      return "Upload";
    default:
      console.log(routeName);
      return routeName;
  }
}
function HeaderWidgets(route: Partial<Route<string, object | undefined>>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  const navigation: any = useNavigation();
  const { logout } = useAuth();
  const { colors } = useTheme();
  switch (routeName) {
    case "Feed":
      return (
        <View style={{ flexDirection: "row" }}>
          <>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                navigation.navigate("UploadPost");
              }}
            >
              <Feather
                name="plus-square"
                size={30}
                color={colors.text}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                navigation.navigate("MessengerScreen");
              }}
            >
              <Feather
                name="message-square"
                size={30}
                color={colors.text}
                style={{ marginRight: 6 }}
              />
            </TouchableOpacity>
          </>
        </View>
      );
    case "Profile":
      return (
        <TouchableOpacity
          style={{ paddingHorizontal: 8 }}
          onPress={() => {
            logout();
          }}
        >
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      );
    case "Account":
      return <></>;
  }
}
