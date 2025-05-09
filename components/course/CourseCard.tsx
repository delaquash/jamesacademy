import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { fontSizes } from "@/themes/app.constant";
// Importing CourseCard component with specific props types
const CourseCard = ({
    activeButton,                // Currently active tab/button (e.g., "About", "Lessons", "Reviews")
    reviewsFetchingHandler,     // Function to call when "Reviews" is clicked
    setActiveButton             // Function to change the active button
  }: {
    activeButton: string;
    setActiveButton: (e: string) => void;
    reviewsFetchingHandler: () => void;
  }) => {
    const { theme } = useTheme(); // Getting the current theme (light/dark) using useTheme hook
  
    return (
      <View
        style={{
          flexDirection: "row",                          // Arrange children in a row
          justifyContent: "center",                      // Center the buttons horizontally
          marginTop: verticalScale(15),                  // Top margin
          marginHorizontal: scale(8),                    // Horizontal margin on both sides
          backgroundColor: theme.dark ? "#2A2D32" : "#E1E9F8", // Background color based on theme
          borderRadius: scale(50),                       // Rounded corners
          height: verticalScale(35),                     // Height of the container
        }}
      >
        {/* ABOUT BUTTON */}
        <TouchableOpacity
          style={{
            paddingHorizontal: scale(25),                        // Left & right padding
            height: verticalScale(32),                           // Button height
            justifyContent: "center",                            // Center the text vertically
            backgroundColor: activeButton === "About"            // Background if active
              ? "#2467EC"
              : theme.dark
              ? "#2A2D32"
              : "transparent",
            borderRadius: scale(50),                             // Rounded edges
          }}
          onPress={() => setActiveButton("About")}               // Set "About" as active on press
        >
          <Text
            style={{
              color: activeButton === "About"                    // Text color based on active state and theme
                ? "#fff"
                : theme.dark
                ? "#ffff"
                : "#000",
              fontFamily: "Poppins_500Medium",                   // Font style
              fontSize: fontSizes.FONT20,                        // Font size
            }}
          >
            About
          </Text>
        </TouchableOpacity>
  
        {/* LESSONS BUTTON */}
        <TouchableOpacity
          style={{
            paddingHorizontal: scale(25),
            height: verticalScale(32),
            justifyContent: "center",
            backgroundColor: activeButton === "Lessons"
              ? "#2467EC"
              : theme.dark
              ? "#2A2D32"
              : "transparent",
            borderRadius: scale(50),
          }}
          onPress={() => setActiveButton("Lessons")} // Set "Lessons" as active on press
        >
          <Text
            style={{
              color: activeButton === "Lessons" // ❌ Bug: This should be `activeButton === "Lessons"`
                ? "#fff"
                : theme.dark
                ? "#ffff"
                : "#000",
              fontFamily: "Poppins_500Medium",
              fontSize: fontSizes.FONT20,
            }}
          >
            Lessons
          </Text>
        </TouchableOpacity>
  
        {/* REVIEWS BUTTON */}
        <TouchableOpacity
          style={{
            paddingHorizontal: scale(25),
            height: verticalScale(32),
            justifyContent: "center",
            backgroundColor: activeButton === "Reviews"
              ? "#2467EC"
              : theme.dark
              ? "#2A2D32"
              : "transparent",
            borderRadius: scale(50),
          }}
          onPress={() => reviewsFetchingHandler()} // Calls function to fetch reviews
        >
          <Text
            style={{
              color: activeButton === "Reviews" 
                ? "#fff"
                : theme.dark
                ? "#ffff"
                : "#000",
              fontFamily: "Poppins_500Medium",
              fontSize: fontSizes.FONT20,
            }}
          >
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  

export default CourseCard

const styles = StyleSheet.create({})