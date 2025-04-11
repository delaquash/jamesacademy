import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { useTheme } from "@/context/ThemeContext";
  import { LinearGradient } from "expo-linear-gradient";
  import { scale, verticalScale } from "react-native-size-matters";
  import { router } from "expo-router";
  import { AntDesign } from "@expo/vector-icons";
  import { fontSizes } from "@/themes/app.constant";
  import IconFour from "@/assets/svg/support-center/four";
  import { FAQData } from "@/config/constants";
  
const FaqScreen = () => {
  return (
    <View>
      <Text>FaqScreen</Text>
    </View>
  )
}

export default FaqScreen

const styles = StyleSheet.create({})