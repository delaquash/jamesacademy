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
import { fetchNotifications, useNotification } from "@/hooks/fetch/UseNotificationHooks";
import SkeltonLoader from "@/utils/Skelton";

const NotificationScreen = () => {
     const { theme } = useTheme();
     const [active, setActive] = useState("All")
      const { data: user, loader } = useFetchUser();
      const { data } = useUserData();
    
// Fetch notifications from the server
const {isLoading, notificationsData,notificationDeleteHandler} =  useNotification()

const renderItem=() => {}
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
      {isLoading ? (
        <View style={{ padding: scale(16)}}>
          {[0,1,2,3,4,5].map((num: number, index: number)=>(
            <MotiView
              transition={{
                type: "timing",
              }}
              style={{
                flexDirection: "row",
                gap: scale(15),
                marginBottom: verticalScale(15),
              }}
              key={index}
              animate={{
                backgroundColor: theme.dark ? "#101010" : "#fff",
              }}
            >
              <Skeleton
                colorMode={theme.dark ? "dark" : "light"}
                radius= {"round"}
                height={scale(60)}
                width={scale(60)}
              />
               <Skeleton
                  colorMode={theme.dark ? "dark" : "light"}
                  height={scale(50)}
                  width={scale(240)}
                />
            </MotiView>
          ))}
        </View>
      ) : (
        <>
             <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ padding: scale(10)}}
          >
            <TouchableOpacity
                  style={{
                    padding: verticalScale(8),
                    backgroundColor:
                      active === "All"
                        ? "#705DF2"
                        : theme.dark
                        ? "#3c43485c"
                        : "#f5f5f5",
                    borderRadius: scale(5),
                    marginRight: scale(20),
                  }}
              onPress={()=>setActive("All")}
            >
               <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins_500Medium",
                    fontSize: fontSizes.FONT18,
                  }}
                >
                  All
                </Text> 
            </TouchableOpacity>
            <TouchableOpacity
                  style={{
                    padding: verticalScale(8),
                    backgroundColor:
                      active === "Courses"
                        ? "#705DF2"
                        : theme.dark
                        ? "#3c43485c"
                        : "#f5f5f5",
                    borderRadius: scale(5),
                    marginRight: scale(20),
                  }}
                  onPress={() => setActive("Courses")}
                >
                  <Text
                    style={{
                      color: theme.dark ? "#fff" : "#000",
                      fontFamily: "Poppins_500Medium",
                      fontSize: fontSizes.FONT18,
                    }}
                  >
                    Courses
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{
                    padding: verticalScale(8),
                    backgroundColor:
                      active === "Resources"
                        ? "#705DF2"
                        : theme.dark
                        ? "#3c43485c"
                        : "#f5f5f5",
                    borderRadius: scale(5),
                    marginRight: scale(20),
                  }}
                  onPress={() => setActive("Resources")}
                >
                  <Text
                    style={{
                      color: theme.dark ? "#fff" : "#000",
                      fontFamily: "Poppins_500Medium",
                      fontSize: fontSizes.FONT18,
                    }}
                  >
                    Resources
                  </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{
                    padding: verticalScale(8),
                    backgroundColor:
                      active === "Support Center"
                        ? "#705DF2"
                        : theme.dark
                        ? "#3c43485c"
                        : "#f5f5f5",
                    borderRadius: scale(5),
                    marginRight: scale(20),
                  }}
                  onPress={() => setActive("Support Center")}
                >
                  <Text
                    style={{
                      color: theme.dark ? "#fff" : "#000",
                      fontFamily: "Poppins_500Medium",
                      fontSize: fontSizes.FONT18,
                    }}
                  >
                    Support Center
                  </Text>
            </TouchableOpacity>
              
          </ScrollView>
        </View>

        <FlatList 
          data={notificationsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        </>
      )}
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