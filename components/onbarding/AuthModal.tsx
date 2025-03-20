import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { Image } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import JWT from "expo-jwt";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

interface AuthHandlerProps {
  name?: string;
  email?: string;
  avatar?: string;
  // setModalVisible?: (modal: boolean) => void;
}


const AuthModal = ({ setModalVisible }: { setModalVisible: (modal: boolean) => void}) => {
    // const configureGoogleSignIn = () => {
    //     if(Platform.OS === "ios"){
    //         GoogleSignin.configure({
    //             iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
    //         })
    //     } else {
    //       GoogleSignin.configure({ 
    //           webClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY,
    //       })
    //     }
    // }

    // useEffect(()=> {
    //   configureGoogleSignIn();
    // }, [])

 
    
    // }

    // const googleSignIn = async() => {
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     console.log(userInfo)
    //     await authHandler({
    //       name: userInfo.data?.user.name!,
    //       email: userInfo.data?.user.email!,
    //       avatar: userInfo.data?.user.photo!,
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const githubAuthEndpoints = {
      authorizationUrl : "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      revocationEndpoint:`https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
    }

    const [request, response] = useAuthRequest({
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "myapp"
      })
      
    },githubAuthEndpoints)

    useEffect(()=> {
      if(response?.type === "success"){
        const { code } = response.params;
        fetchAccessToken(code)
      }
    },[])

    const fetchAccessToken = async(code: string) => {
      const tokenResponse = await fetch(githubAuthEndpoints.tokenUrl, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
       body: `client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`
      })

      const { access_token } = await tokenResponse.json();
      fetchUserInfo(access_token)
    }

  const fetchUserInfo = async(token: string) => {
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`
      }
    })

    const userData = await userResponse.json()
    await authHandler({
      name: userData.name!,
      email: userData.email!,
      avatar: userData.avatar_url!
    })
  }

   // github auth handler end 
  const authHandler = async({ name, email, avatar}:AuthHandlerProps) => {
    const user = {
      name,
      email,
      avatar,
    }

    const token = JWT.encode({...user}, process.env.EXPO_PUBLIC_JWT_SECRET!);

    const res =  await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
      signedToken: token
    })
    await  SecureStore.setItemAsync("accessToken", res.data.accessToken);
    // This is to close the modal after successful login
    setModalVisible(false)
    router.push("/(tabs)")
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
