import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingScreen = () => {
    const { theme, toggleTheme} = useTheme()
    const [courseUpdate, setCourseUpdate] = useState<any>("");
    const [supportTicketResponse, setSupportTicketResponse] = useState<any>("");
    const [latestUpdate, setLatestUpdate] = useState<any>("")

    useEffect(() => {
      const checkForPreferences = async () => {
        const courseUpdate = await AsyncStorage.getItem("courseUpdate")
        const latestUpdate = await AsyncStorage.getItem("latestUpdate");
        const supportTicketResponse = await AsyncStorage.getItem("supportTicketResponse")
        if(courseUpdate || supportTicketResponse || latestUpdate){
            setCourseUpdate(courseUpdate === "true" ? true : false)
            setSupportTicketResponse(supportTicketResponse === "true" ? true : false)
            setLatestUpdate(latestUpdate === "true" ? true : false)
        } else {
            await AsyncStorage.setItem("courseUpdate", "true")
            await AsyncStorage.setItem("latestUpdate", "true")
            await AsyncStorage.setItem("supportTicketResponse", "true")

            setCourseUpdate(true)
            setSupportTicketResponse(true)
            setLatestUpdate(true)
        }
      }
      checkForPreferences()
    }, [])
    

    const updatePreferences = async(e: string) => {
        if(e === "courseUpdate") {
            setCourseUpdate(!courseUpdate)
            const value = !courseUpdate;
            await AsyncStorage.setItem("courseUpdate", value.toString())
        } else if (e === "supportTicketResponse"){
            setSupportTicketResponse(!setSupportTicketResponse)
            const value = !supportTicketResponse;
            await AsyncStorage.setItem("supportTicketResponse", value.toString())
        } else {
            setLatestUpdate(!latestUpdate)
            const value = !latestUpdate;
            await AsyncStorage.setItem("latestUpdates", value.toString())
        }
    }
  return (
    <View>
      <Text>SettingScreen</Text>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})