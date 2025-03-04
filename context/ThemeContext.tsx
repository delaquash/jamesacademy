import React, {useState, useEffect , useContext, createContext } from "react";
// Importing `Appearance` (to detect system theme) and `useColorScheme` (hook for theme detection)
import { Appearance, useColorScheme } from "react-native"; 
// Importing AsyncStorage to store and retrieve the user's preferred theme
import AsyncStorage from "@react-native-async-storage/async-storage"; 


// Define light theme object
const LightTheme = {
    dark: false,
    colors: {
        background:" #fffff",
        text: "#000000"
    }
}

// Define the dark theme
const DarkTheme = {
    dark: true,
    colors: {
        background: "#000000",
        text: "#ffffff"
    }
}

// Create a context for theme management with a default value
const ThemeContext = createContext({
    theme: LightTheme, //this is the default theme
    toggleTheme: () => {} // this is the toggle button
})

// ThemeProvider component that provides the theme to the entire application
export const ThemeProvider = ({ children }: any) => {
    // Get the user system color scheme
    const systemColorSheme = useColorScheme()

    // Initilaize state base on the system color theme
    const [ theme, setTheme ] = useState(systemColorSheme === "dark" ? DarkTheme : LightTheme)

    useEffect(()=>{
        const loadTheme = async() => {
            // Retrieve aved theme from asynstorage
            const savedTheme = await AsyncStorage.getItem("userTheme")
            
            if(savedTheme) {
                // Apply the saved theme if it exist
                setTheme(savedTheme === "dark" ? DarkTheme : LightTheme)
            } else {
                // Otherwise use the system theme
                setTheme(systemColorSheme === "dark" ? DarkTheme : LightTheme)
            }

        }
        loadTheme()
    }, []);


    const toggleTheme = async () => {
        // Toggle between light and dark theme
        const newTheme= theme === DarkTheme ? LightTheme : DarkTheme;

        // Update the state with the new theme
        setTheme(newTheme)

        // Save the selected theme to AsyncStorage for persistence
        await AsyncStorage.setItem("userTheme", newTheme.dark? "dark":"light")
    }

    return (
        // {/* Provide the theme and toggle function to the app */}
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {/* Render child component */}
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook for accessing the theme context and also toggle context
export const useTheme = () => useContext(ThemeContext)