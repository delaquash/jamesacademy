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
import { setAuthorizationHeader, useFetchUser } from "@/hooks/fetch/fetchUserHook";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


interface DeleteResponseType {
  notifications: NotificationType[];
}

const NotificationScreen = () => {
     const { theme } = useTheme();
      const { data: user, loader } = useFetchUser();
      const { data } = useUserData();
    
// Fetch notifications from the server
const fetchNotifications = async () => {
  await setAuthorizationHeader(); // Set the auth token in headers
  const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/get-notification`);
  return res.data.notification; // Return the array of notifications
};

// Delete a specific notification by its ID
const deleteNotification = async (notification: NotificationType) => {
  await setAuthorizationHeader(); // Set the auth token in headers
  const res = await axios.delete(
    `${process.env.EXPO_PUBLIC_SERVER_URI}/delete-notification/${notification.id}`
  );
  return res.data.notification; // Return deleted notification or message
};

// Custom hook to fetch and manage notifications
 const useNotification = () => {
  const queryClient = useQueryClient(); // Used to manually refetch or update cache

  // useQuery for fetching notifications
  const { data: notificationsData = [], isLoading, isError } = useQuery({
    queryKey: ["notifications"], // Unique key for caching the data
    queryFn: fetchNotifications, // Function that fetches the notifications
    retry: 2, // Retry the request up to 2 times if it fails
  });

  // useMutation for deleting a notification
  const deleteMutation = useMutation({
    mutationFn: (notification: NotificationType) => deleteNotification(notification), // Function to delete a specific notification
    onSuccess: () => {
      // After successful deletion, refetch notifications to keep UI in sync
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // Handler function to trigger the mutation
  const notificationDeleteHandler = (item: NotificationType) => {
    deleteMutation.mutate(item); // Pass the notification to be deleted
  };

  // Return everything needed by the component
  return {
    notificationsData,         // List of notifications
    isLoading,                 // Loading state
    isError,                   // Error state
    notificationDeleteHandler, // Function to delete a notification
  };
};



  return (
    <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.dark ? "#101010" : "#fff" }}
        edges={["top"]}
    >
    <View style={{ overflow: "hidden", paddingBottom: verticalScale(1) }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: theme.dark ? verticalScale(25) : verticalScale(25),
          backgroundColor: theme.dark ? "#131313" : "#fff",
          paddingHorizontal: scale(8),
          paddingBottom: theme.dark ? verticalScale(5) : verticalScale(0),
          shadowColor: theme.dark ? "#fff" : "#000",
          shadowOpacity: theme.dark ? 0.1 : 0.1,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
          elevation: theme.dark ? 5 : 5,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(5),
          }}
        >
          <AntDesign
            name="left"
            size={scale(22)}
            color={theme.dark ? "#fff" : "005DE0"}
          />
          <Text
            style={{
              color: theme?.dark ? "#fff" : "#005DE0",
              fontSize: fontSizes.FONT20,
            }}
          >
            Back
          </Text>
        </Pressable>
        <Text
            style={{
              color: theme.dark ? "#fff" : "#000",
              textAlign: "center",
              width: scale(220),
              fontSize: fontSizes.FONT22,
            }}
          >
            Notifications
          </Text>
        </View>
      </View>
    </SafeAreaView>
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