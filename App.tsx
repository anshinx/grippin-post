import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "./hooks/useTheme";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  const DarkTheme = {
    dark: true,
    colors: {
      primary: "rgb(255, 1, 1)",
      background: "rgb(2,2,2)",
      card: "rgb(0, 0, 0)",
      text: "rgb(255,255,255)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
      notSelected: "rgb(28, 255, 30)",
    },
  };
  const LightTheme = {
    dark: false,
    colors: {
      primary: "rgb(255, 45, 85)",
      background: "rgb(242, 242, 242)",
      card: "rgb(250, 250, 250)",
      text: "rgb(0, 0, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
      notSelected: "rgb(28, 255, 30)",
    },
  };
  // SplashScreen.preventAutoHideAsync();

  return (
    <NavigationContainer
      theme={useColorScheme() == "dark" ? DarkTheme : LightTheme}
    >
      <ThemeProvider>
        <StatusBar style="auto" />
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
