import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { scale, verticalScale } from "react-native-size-matters";
  import { router } from "expo-router";
  import { AntDesign, MaterialIcons } from "@expo/vector-icons";
  import { fontSizes } from "@/themes/app.constant";
  import { MotiView } from "moti";
  import { Skeleton } from "moti/skeleton";
  import { NotificationsData } from "@/config/constants";
  import { Swipeable } from "react-native-gesture-handler";
  import { useUserData } from "@/hooks/fetch/userData";
  import { useTheme } from "@/context/ThemeContext";
  import { useFetchUser } from "@/hooks/fetch/fetchUserHook";
const NotificationScreen = () => {
     const { theme } = useTheme();
      const { data: user, loader } = useFetchUser();
      const { data } = useUserData();
    
  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})