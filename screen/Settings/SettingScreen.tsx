import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, verticalScale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { fontSizes } from '@/themes/app.constant'
import { ScrollView } from 'moti'
import { Switch } from 'react-native-gesture-handler'

const SettingScreen = () => {
    // Get theme context and toggle function
    const { theme, toggleTheme} = useTheme()
    // Initialize state variables for notification preferences
    const [courseUpdate, setCourseUpdate] = useState<any>("");
    const [supportTicketResponse, setSupportTicketResponse] = useState<any>("");
    const [latestUpdate, setLatestUpdate] = useState<any>("")

    useEffect(() => {
      // Function to load user preferences from AsyncStorage when component mounts
      const checkForPreferences = async () => {
        // Get stored preferences
        const courseUpdate = await AsyncStorage.getItem("courseUpdate")
        const latestUpdate = await AsyncStorage.getItem("latestUpdate");
        const supportTicketResponse = await AsyncStorage.getItem("supportTicketResponse")
        
        // If preferences exist, set them in state (convert string "true"/"false" to boolean)
        if(courseUpdate || supportTicketResponse || latestUpdate){
            setCourseUpdate(courseUpdate === "true" ? true : false)
            setSupportTicketResponse(supportTicketResponse === "true" ? true : false)
            setLatestUpdate(latestUpdate === "true" ? true : false)
        } else {
            // If no preferences stored, set defaults to true and store them
            await AsyncStorage.setItem("courseUpdate", "true")
            await AsyncStorage.setItem("latestUpdate", "true")
            await AsyncStorage.setItem("supportTicketResponse", "true")

            // Also update state with default values
            setCourseUpdate(true)
            setSupportTicketResponse(true)
            setLatestUpdate(true)
        }
      }
      // Call the function
      checkForPreferences()
    }, []) // Empty dependency array means this runs once on mount
    
    // Function to handle preference updates when switches are toggled
    const updatePreferences = async(e: string) => {
        if(e === "courseUpdate") {
            // Toggle courseUpdate state
            setCourseUpdate(!courseUpdate)
            const value = !courseUpdate;
            // Store updated preference
            await AsyncStorage.setItem("courseUpdate", value.toString())
        } else if (e === "supportTicketResponse"){
            // BUG: This is wrong! Should be (!supportTicketResponse), not (!setSupportTicketResponse)
            setSupportTicketResponse(!setSupportTicketResponse) // This is incorrect
            const value = !supportTicketResponse;
            await AsyncStorage.setItem("supportTicketResponse", value.toString())
        } else {
            // Toggle latestUpdate state
            setLatestUpdate(!latestUpdate)
            const value = !latestUpdate;
            // BUG: Wrong key name! Should be "latestUpdate" to match the getter above
            await AsyncStorage.setItem("latestUpdates", value.toString()) // Key mismatch with getter
        }
    }

  return (
    // SafeAreaView ensures content is visible on different devices (notches, etc.)
    <SafeAreaView
        edges={['top']}
        style={{
            flex: 1,
            backgroundColor: theme.dark ? "#101010" : "#fff"
        }}
    >
        {/* StatusBar adapts to theme */}
        <StatusBar barStyle={!theme.dark ? "dark-content" : "light-content"}/>
        
        {/* Header bar with back button and title */}
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                height: verticalScale(25),
                backgroundColor: theme.dark ? "#131313" : "#fff",
                paddingHorizontal: scale(10),
                paddingBottom: verticalScale(5),
                shadowColor: theme.dark ? "#fff" : "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 1},
                shadowRadius: 1,
                elevation: 5
            }}
        >
            {/* Back button */}
            <Pressable
                onPress={()=> router.back()}
                style={{ flexDirection: "row", alignItems: "center"}}
            >
                <AntDesign 
                    name='left'
                    size={scale(20)}
                    color={theme.dark ? "#fff" : "#005DE0"}
                />                
            
                <Text
                    style={{
                        color: theme.dark ? "#fff" : "#005DE0",
                        fontSize: fontSizes.FONT20
                    }}
                >
                    Back
                </Text>
            </Pressable>
             {/* Screen title */}
             <Text
                style={{
                  width: scale(220),
                  fontSize: fontSizes.FONT22,
                  textAlign: "center",
                  color: theme?.dark ? "#fff" : "#000",
                }}
            >
              Settings
            </Text>
        </View>

        {/* Main scrollable content area */}
        <ScrollView style={{ padding: scale(20)}}>
            {/* Notification settings section */}
            <Text
                style={[styles.sectionHeader,{color: theme.dark? "#fff" : "#000"}]}
            >
                Push Notifications
            </Text>
            
            {/* Course Updates toggle */}
            <View
                style={styles.settingItem}
            >
                <Text style={[styles.normalText, { color: theme.dark ? "#fff" : "#000"}]}>
                    Course Updates
                </Text>
                <Switch 
                    value={courseUpdate}
                    onValueChange={()=> updatePreferences("courseUpdate")}
                />
            </View>
            
            {/* Support Ticket Response toggle */}
            <View
                style={styles.settingItem}
            >
                <Text style={[styles.normalText, { color: theme.dark ? "#fff" : "#000"}]}>
                    Support Ticket Response
                </Text>
                <Switch 
                    value={supportTicketResponse}
                    onValueChange={()=> updatePreferences("supportTicketResponse")}
                />
            </View>
            
            {/* Latest Update toggle */}
            <View
                style={styles.settingItem}
            >
                <Text style={[styles.normalText, { color: theme.dark ? "#fff" : "#000"}]}>
                    Latest Update
                </Text>
                <Switch 
                    value={latestUpdate}
                    onValueChange={()=> updatePreferences("latestUpdate")}
                />
            </View>
            
            {/* Theme settings section */}
            <View style={styles.settingSection}>
                <Text
                    style={[
                        styles.sectionHeader,
                        { color: theme.dark ? "#fff" : "#000" },
                    ]}
                >
                    Appearance
                </Text>
                
                {/* Theme toggle (dark/light mode) */}
                <View style={styles.settingItem}>
                    <Text
                        style={[
                            styles.normalText,
                            { color: theme.dark ? "#fff" : "#000" },
                        ]}
                    >
                        App Theme
                    </Text>
                    <Switch value={theme.dark} onValueChange={toggleTheme} />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    settingSection: {
        marginBottom: verticalScale(30)
    },
    sectionHeader: {
        fontSize: fontSizes.FONT23,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: verticalScale(10)
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: verticalScale(15)
    },
    normalText: {
        fontSize: fontSizes.FONT19,
        opacity: 0.9,
        fontFamily: "Poppins_500Medium"
    }
})