import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { Image } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import JWT from "expo-jwt";
import axios from "axios";

interface AuthHandlerProps {
  name: string;
  email: string;
  avatar: string;
}

const AuthModal = () => {
    const configureGoogleSignIn = () => {
        if(Platform.OS === "ios"){
            GoogleSignin.configure({
                iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
            })
        } else {
          GoogleSignin.configure({ 
              webClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY,
          })
        }
    }

    useEffect(()=> {
      configureGoogleSignIn();
    }, [])

    const authHandler = async({ name, email, avatar}:AuthHandlerProps) => {
      const user = {
        name,
        email,
        avatar,
      }

      const token = JWT.encode({...user}, process.env.EXPO_PUBLIC_JWT_SECRET!);

      await axios.post``
    }

    const googleSignIn = async() => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
        await authHandler({
          name: userInfo.data?.user.name!,
          email: userInfo.data?.user.email!,
          avatar: userInfo.data?.user.photo!,
        })
      } catch (error) {
        console.log(error)
      }
    }

   
  return (
    <BlurView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            width: windowWidth(420),
            height: windowHeight(250),
            marginHorizontal: windowWidth(50),
            backgroundColor: "#fff",
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={(e) => e.stopPropagation()}
        >
          <Text
            style={{
              fontSize: fontSizes.FONT35,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Join Jamesacademy
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT17,
              paddingTop: windowHeight(5),
              fontFamily: "Poppins_300Light",
            }}
          >
            It's easier than your imagination
          </Text>
          <View
            style={{
              paddingVertical: windowHeight(10),
              flexDirection: "row",
              gap: windowWidth(20),
            }}
          >
            <Pressable>
              <Image
                source={require("@/assets/images/onboarding/google.png")}
                style={{
                  width: windowWidth(40),
                  height: windowHeight(40),
                  resizeMode: "contain",
                }}
              />
            </Pressable>
            <Pressable>
              <Image
                source={require("@/assets/images/onboarding/apple.png")}
                style={{
                  width: windowWidth(40),
                  height: windowHeight(40),
                  resizeMode: "contain",
                }}
              />
            </Pressable>
            <Pressable>
              <Image
                source={require("@/assets/images/onboarding/github.png")}
                style={{
                  width: windowWidth(40),
                  height: windowHeight(40),
                  resizeMode: "contain",
                }}
              />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </BlurView>
  );
};

export default AuthModal;

const styles = StyleSheet.create({});
