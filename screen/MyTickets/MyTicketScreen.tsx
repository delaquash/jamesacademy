import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { scale, verticalScale } from "react-native-size-matters";
import IconSix from "@/assets/svg/support-center/six";
import { fontSizes } from "@/themes/app.constant";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUserData} from "@/hooks/fetch/userData";

const MyTicketScreen = () => {
    const { theme } = useTheme();
    const { user } = useUserData()
  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? "#101010" : "#fff" }}>
      <View
        
      >

      </View>
    </View>
  )
}

export default MyTicketScreen

const styles = StyleSheet.create({})