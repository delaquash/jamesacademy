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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: verticalScale(2),
      },
      sectionHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: verticalScale(8),
        marginBottom: 5,
      },
      notificationItem: {
        flexDirection: "row",
        paddingVertical: verticalScale(5),
        backgroundColor: "#fff",
      },
      notificationIcon: {
        width: scale(30),
        height: scale(30),
        borderRadius: 20,
        backgroundColor: "#FFCA28",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      },
      notificationInitial: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
      },
      notificationText: {
        flex: 1,
        color: "#333",
        fontFamily: "Poppins_400Regular",
        fontSize: fontSizes.FONT17,
      },
      deleteButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: scale(50),
        height: "100%",
      },
      deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
      },
})