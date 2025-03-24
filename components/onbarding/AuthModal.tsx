import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { Image } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import JWT from "expo-jwt";
import * as SecureStore from "expo-secure-store";
import jwt from "jwt-encode"; 
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

    
  
  // GitHub auth configuration
const githubAuthConfig = {
  authorizationUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
  clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
  redirectUri:  "myapp://",
  scopes: ["identity", "user:email"] // Added email scope
};

// Validate required env variables
useEffect(() => {
  if (!githubAuthConfig.clientId || !githubAuthConfig.clientSecret) {
    console.error("Missing GitHub OAuth credentials in environment variables");
  }
}, []);

const handleGithubLogin = async() => {
  try {
    // Create the authorization URL with required parameters
    const queryParams = new URLSearchParams({
      client_id: githubAuthConfig.clientId || '',
      redirect_uri: "myapp://",
      scope: githubAuthConfig.scopes.join(" "),
      state: generateRandomString(16), // Add state parameter for security
    }).toString();
    
    const authUrl = `${githubAuthConfig.authorizationUrl}?${queryParams}`;
    
    // Open browser for authentication
    const result = await WebBrowser.openAuthSessionAsync(authUrl, githubAuthConfig.redirectUri);
    
    // Always dismiss the browser session
    WebBrowser.dismissAuthSession();
    
    if (result.type === "success") {
      const urlParams = new URLSearchParams(result.url.split("?")[1]);
      const code = urlParams.get("code");
      
      if (code) {
        await fetchAccessToken(code);
      } else {
        console.error("No code received from GitHub");
      }
    } else {
      console.log("Authentication canceled or failed", result);
    }
  } catch (error) {
    console.error("GitHub login error:", error);
  }
};

interface TokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface TokenRequestBody {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
}

const fetchAccessToken = async(code: string): Promise<void> => {
  try {
    const tokenResponse = await fetch(githubAuthConfig.tokenUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: githubAuthConfig.clientId || '',
        client_secret: githubAuthConfig.clientSecret || '',
        code: code.toString(),
        redirect_uri:"myapp://", //`${githubAuthConfig.redirectUri}`,
      } satisfies TokenRequestBody).toString()
    });
    
    const data: TokenResponse = await tokenResponse.json();
    
    if (data.error) {
      throw new Error(data.error_description || data.error);
    }
    
    if (data.access_token) {
      await fetchUserInfo(data.access_token);
    } else {
      throw new Error("No access token received");
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

const fetchUserInfo = async(token: any) => {
  try {
    // Get user profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`
      }
    });
    
    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }
    
    const userData = await userResponse.json();
    
    // Get user email if it's not in the profile
    let email = userData.email;
    if (!email) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${token}`
        }
      });
      
      if (emailResponse.ok) {
        const emails = await emailResponse.json();
        interface GithubEmail {
          email: string;
          primary: boolean;
          verified: boolean;
          visibility: string | null;
        }
        const primaryEmail: GithubEmail | undefined = emails.find((e: GithubEmail) => e.primary) || emails[0];
        email = primaryEmail ? primaryEmail.email : null;
      }
    }
    
    if (!email) {
      throw new Error("Could not retrieve user email");
    }
    
    await authHandler({
      name: userData.name || userData.login,
      email: email,
      avatar: userData.avatar_url || ""
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
const authHandler = async({ name, email, avatar }: AuthHandlerProps) => {
  try {
    const user = { name, email, avatar };
    console.log("Authenticated user:", user);
    console.log("Attempting to connect to API:", process.env.EXPO_PUBLIC_API_URL);
    
    const payload = {
      ...user,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };
    
    const token = jwt(payload, process.env.EXPO_PUBLIC_JWT_SECRET!);
    
    // Add timeout to axios request
    const response = await axios.post(
      "http://192.168.0.111:7000/api/v1/user/login", 
      { signedToken: token },
      { timeout: 10000 } // 10 second timeout
      

    );
    console.log("This is response from the backend", response)
    // Rest of the code...
  } catch (error: any) {
    console.error("Authentication error details:", error.message);
    if (error.code === 'ECONNABORTED') {
      console.error("Request timed out. API server might be down.");
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API response error:", error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from API server");
    }
    // For testing, you can bypass the API call and continue navigation
    alert("API connection failed, but continuing for testing purposes");
    setModalVisible(false);
    router.push("/(tabs)");
  }
};
// Utility function to generate random state parameter
const generateRandomString = (length: number) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

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
            <Pressable
              onPress={()=> handleGithubLogin()}
            >
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
