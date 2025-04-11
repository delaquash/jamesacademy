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
    const { theme } = useTheme();
    const [activeQuestion, setActiveQuestion] = useState(null)
  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? "#101010" : "#fff"}}>
        <LinearGradient
              colors={!theme.dark ? ["#FAE0BC", "#FAE0BC"] : ["#8673FC", "#8673FC"]}
              style={{
                height: verticalScale(200),
                borderBottomLeftRadius: scale(35),
                borderBottomRightRadius: scale(35),
                overflow: "hidden",
              }}
        >
                 <Pressable
          style={{
            width: scale(35),
            height: scale(35),
            backgroundColor: "#fff",
            borderRadius: scale(5),
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: verticalScale(32),
            left: scale(10),
            zIndex: 1,
          }}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
        <Text
          style={{
            textAlign: "center",
            paddingTop: verticalScale(45),
            fontSize: fontSizes.FONT28,
            color: theme.dark ? "#fff" : "#807F7F",
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          FAQ's
        </Text>
        <IconFour />
      </LinearGradient>
      <View style={{ padding: scale(20) }}>
        <View>
          <AntDesign
            name="search1"
            size={scale(19)}
            color={theme.dark ? "#fff" : "#000"}
            style={{
              position: "absolute",
              top: verticalScale(9),
              left: scale(10),
            }}
          />
          <TextInput
            style={{
              height: verticalScale(35),
              borderWidth: 1,
              color: theme.dark ? "#D9D9D9" : "#000",
              borderColor: theme.dark ? "#D9D9D9" : "#000",
              borderRadius: scale(20),
              paddingLeft: scale(32),
              fontSize: fontSizes.FONT20,
            }}
            placeholder="Search for Topics!"
            placeholderTextColor={theme.dark ? "#D9D9D9" : "#000"}
          />
        </View>
      </View>
      {/*  */}
    </View>
  )
}

export default FaqScreen

const styles = StyleSheet.create({})