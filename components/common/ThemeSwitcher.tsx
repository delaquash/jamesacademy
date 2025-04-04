import {
    Animated,       
    StyleSheet,
    TouchableOpacity,  
} from "react-native";
import React, { useState } from "react"; 
import { useTheme } from "@/context/ThemeContext"; 
import { scale, verticalScale } from "react-native-size-matters"; 
import { IsAndroid, IsHaveNotch, IsIPAD } from "@/themes/app.constant"; 

export default function ThemeSwitcher() {
    // Extracting `theme` and `toggleTheme` from the theme context
    const { theme, toggleTheme } = useTheme();
    
    // State to track whether the switch is ON (light theme) or OFF (dark theme)
    const [isOn, setIsOn] = useState(theme.dark ? false : true);
    
    // Animated value used to animate the switch circle's position
    const [animatedValue] = useState(new Animated.Value(theme.dark ? 0 : 1));
  
    // Function to toggle the switch and the theme
    const toggleSwitch = () => {
        // Animate the switch position from left to right and vice versa
        Animated.timing(animatedValue, {
            toValue: isOn ? 0 : 1, // Move the switch to the opposite position
            duration: 300, // Duration of the animation
            useNativeDriver: false, // Use JavaScript-driven animations (because we are animating the transform property)
        }).start(() => {
            // After animation, toggle the theme
            toggleTheme();
        });
        // Toggle the `isOn` state to reflect the new position
        setIsOn(!isOn);
    };
  
    // Interpolation to translate the switch circle horizontally based on the animated value
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],         // Input range (from 0 to 1)
        outputRange: [2, scale(19)], // Output range (position from 2px to a scaled value for responsiveness)
    });
  
    // JSX for rendering the theme switch button
    return (
        <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
            {/* Animated circle that moves when the switch is toggled */}
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ translateX }], // Apply the animated translation to the circle
                    },
                ]}
            />
        </TouchableOpacity>
    );
}
  
// Styles for the switch container and circle
const styles = StyleSheet.create({
    switchContainer: {
        width: IsAndroid ? scale(44) : scale(42), // Different width for Android vs other platforms
        height: !IsHaveNotch
            ? verticalScale(23) // Smaller height for devices without a notch
            : IsIPAD
            ? verticalScale(28) // Larger height for iPad
            : verticalScale(20), // Default height
        borderRadius: scale(13), // Rounded corners for the container
        backgroundColor: "#D9D9D9", // Light gray background for the container
        padding: scale(2), // Padding for spacing
        justifyContent: "center", // Center the circle within the container
    },
    circle: {
        width: IsAndroid ? scale(20) : scale(18), // Different size for Android vs other platforms
        height: IsAndroid ? scale(20) : scale(18), // Ensuring the circle is a perfect circle (width = height)
        borderRadius: scale(11), // Rounded circle
        backgroundColor: "#6D55FE", // Purple color for the circle
    },
});
