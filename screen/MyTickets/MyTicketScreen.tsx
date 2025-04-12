import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { scale, verticalScale } from "react-native-size-matters";
import IconSix from "@/assets/svg/support-center/six";
import { fontSizes } from "@/themes/app.constant";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const MyTicketScreen = () => {
    const { theme } = useTheme();
  return (
    <View>
      <Text>MyTicketScreen</Text>
    </View>
  )
}

export default MyTicketScreen

const styles = StyleSheet.create({})