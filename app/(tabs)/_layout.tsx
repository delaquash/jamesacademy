import { useTheme } from "@/context/ThemeContext";
import { fetchUser } from "@/hooks/fetch/fetchUserHook";
import { fontSizes, IsIPAD } from "@/themes/app.constant";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { moderateScale, scale } from "react-native-size-matters";

export default function _layout () {
  const { theme} = useTheme();
  const { loader } = fetchUser()
  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if(route.name === "index") {
              iconName = (
                <Feather 
                  name="home"
                  size={moderateScale(24)}
                  color={color}
                  style={{ width: IsIPAD ? scale(24) : "auto" }}
                />
              );
            } else if(route.name === "courses/index"){
              iconName =  (
                <Feather 
                  name="book-open"
                  size={moderateScale(24)}
                  style={{ width: IsIPAD ? scale(20) : "auto" }}
                  color={color}
                />
              )
            } else if(route.name === "resources/index"){
              iconName =  (
                <Ionicons
                  name="document-text-outline"
                  size={moderateScale(24)}
                  style={{ width: IsIPAD ? scale(20) : "auto" }}
                  color={color}
                />
              )
            }
            return iconName
          },
          tabBarActiveTintColor: theme.dark ? "#19C964" : "#4A90E2",
          tabBarInactiveTintColor: theme.dark ? "#FFF" : "#8e8e93",
          headerShown: route.name === "courses/index" || route.name === "resource/index" ? true : false,
          headerTitle: route.name === "courses/index" ? "Courses" : route.name === "resource/index" ? "Video Lessons" : "",
          headerTitleStyle: {
            color: theme.dark ? "#FFF" : "#000",
            textAlign: "center",
            width: scale(20),
            fontFamily: "Poppins_400Regular",
            fontSize: fontSizes.FONT22
          },
          headerBackgroundContainerStyle: {
            backgroundColor: theme.dark ? "#131313" : "#fff",
            shadowColor: theme.dark ? "#fff" : "000"
          }
        }
      }}
    >
     <Tabs.Screen name="index" />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="resources/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  )
}