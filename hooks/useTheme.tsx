import React, { useContext, createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
const ThemeFunction = createContext({} as any);

const UseTheme = () => {
  return useContext(ThemeFunction);
};

export const ThemeProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState({
    background: "#ffffff",
    text: "#000000",
    blues: "#00ffffff",
  });
  
  useEffect(() => {
    const unsub = () => {
      if (Appearance.getColorScheme() === "dark") { 
        setColor({
          background: "#000",
          text: "#ffffff",
          blues: "#00fa",
        });
        console.log("dark");
      } else {
        setColor({
          background: "#ffffff",
          text: "#000000",
          blues: "#00f",
        });
        console.log("light");
      }

      Appearance.addChangeListener(({ colorScheme }: any) => {
        if (colorScheme === "dark") {
          setColor({
            background: "#ffffff",
            text: "#000000",
            blues: "#00f",
          });
          console.log("dark");
        } else {
          setColor({
            background: "#000",
            text: "#000000",
            blues: "#00a",
          });
          console.log("light");
        }
      });
      setLoading(false);
    };
    unsub();
     
    return unsub();
  },[]);

  const value = {
    color: color,
  };
  return (
    <ThemeFunction.Provider
      value={{
        color: color,
      }}
    >
      {!loading && children}
    </ThemeFunction.Provider>
  );
};
export default UseTheme;
