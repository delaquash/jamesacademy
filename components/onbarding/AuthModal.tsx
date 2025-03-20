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
// const githubAuthConfig = {
//   authorizationUrl: "https://github.com/login/oauth/authorize",
//   tokenUrl: "https://github.com/login/oauth/access_token",
//   revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
//   clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
//   clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
//   redirectUri:  "myapp://",
//   scopes: ["identity", "user:email"] // Added email scope
// };

// // Validate required env variables
// useEffect(() => {
//   if (!githubAuthConfig.clientId || !githubAuthConfig.clientSecret) {
//     console.error("Missing GitHub OAuth credentials in environment variables");
//   }
// }, []);

// const handleGithubLogin = async() => {
//   try {
//     // Create the authorization URL with required parameters
//     const queryParams = new URLSearchParams({
//       client_id: githubAuthConfig.clientId || '',
//       redirect_uri: "myapp://",
//       scope: githubAuthConfig.scopes.join(" "),
//       state: generateRandomString(16), // Add state parameter for security
//     }).toString();
    
//     const authUrl = `${githubAuthConfig.authorizationUrl}?${queryParams}`;
    
//     // Open browser for authentication
//     const result = await WebBrowser.openAuthSessionAsync(authUrl, githubAuthConfig.redirectUri);
    
//     // Always dismiss the browser session
//     WebBrowser.dismissAuthSession();
    
//     if (result.type === "success") {
//       const urlParams = new URLSearchParams(result.url.split("?")[1]);
//       const code = urlParams.get("code");
      
//       if (code) {
//         await fetchAccessToken(code);
//       } else {
//         console.error("No code received from GitHub");
//       }
//     } else {
//       console.log("Authentication canceled or failed", result);
//     }
//   } catch (error) {
//     console.error("GitHub login error:", error);
//   }
// };

// interface TokenResponse {
//   access_token?: string;
//   error?: string;
//   error_description?: string;
// }

// interface TokenRequestBody {
//   client_id: string;
//   client_secret: string;
//   code: string;
//   redirect_uri: string;
// }

// const fetchAccessToken = async(code: string): Promise<void> => {
//   try {
//     const tokenResponse = await fetch(githubAuthConfig.tokenUrl, {
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       body: new URLSearchParams({
//         client_id: githubAuthConfig.clientId || '',
//         client_secret: githubAuthConfig.clientSecret || '',
//         code: code.toString(),
//         redirect_uri:"myapp://", //`${githubAuthConfig.redirectUri}`,
//       } satisfies TokenRequestBody).toString()
//     });
    
//     const data: TokenResponse = await tokenResponse.json();
    
//     if (data.error) {
//       throw new Error(data.error_description || data.error);
//     }
    
//     if (data.access_token) {
//       await fetchUserInfo(data.access_token);
//     } else {
//       throw new Error("No access token received");
//     }
//   } catch (error) {
//     console.error("Error fetching access token:", error);
//   }
// };

// const fetchUserInfo = async(token: any) => {
//   try {
//     // Get user profile
//     const userResponse = await fetch("https://api.github.com/user", {
//       headers: {
//         Authorization: `token ${token}`
//       }
//     });
    
//     if (!userResponse.ok) {
//       throw new Error(`GitHub API error: ${userResponse.status}`);
//     }
    
//     const userData = await userResponse.json();
    
//     // Get user email if it's not in the profile
//     let email = userData.email;
//     if (!email) {
//       const emailResponse = await fetch("https://api.github.com/user/emails", {
//         headers: {
//           Authorization: `token ${token}`
//         }
//       });
      
//       if (emailResponse.ok) {
//         const emails = await emailResponse.json();
//         interface GithubEmail {
//           email: string;
//           primary: boolean;
//           verified: boolean;
//           visibility: string | null;
//         }
//         const primaryEmail: GithubEmail | undefined = emails.find((e: GithubEmail) => e.primary) || emails[0];
//         email = primaryEmail ? primaryEmail.email : null;
//       }
//     }
    
//     if (!email) {
//       throw new Error("Could not retrieve user email");
//     }
    
//     await authHandler({
//       name: userData.name || userData.login,
//       email: email,
//       avatar: userData.avatar_url || ""
//     });
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//   }
// };

// const authHandler = async({ name, email, avatar }: AuthHandlerProps) => {
//   try {
//     const user = { name, email, avatar };
    
//     // Add expiration to JWT
//     const payload = {
//       ...user,
//       exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
//     };
    
//     const token = JWT.encode(payload, process.env.EXPO_PUBLIC_JWT_SECRET!);
    
//     const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
//       signedToken: token
//     });
    
//     if (response.data && response.data.accessToken) {
//       // await SecureStore.setItemAsync("accessToken", response.data.accessToken);
//       // setModalVisible(false);
//       // router.push("/(tabs)");
//       console.log("Auth response received:", response.data);
// console.log("Attempting to store token and navigate...");
// await SecureStore.setItemAsync("accessToken", response.data.accessToken);
// console.log("Token stored, closing modal...");
// setModalVisible(false);
// console.log("Modal closed, pushing to tabs route...");
// router.replace("/(tabs)");
// console.log("Navigation completed");
//     } else {
//       throw new Error("Invalid response from authentication server");
//     }
//   } catch (error) {
//     console.error("Authentication error:", error);
//   }
// };

// // Utility function to generate random state parameter
// const generateRandomString = (length: number) => {
//   const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return result;
// };


 // github auth start
 const githubAuthEndpoints = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

const [request, response] = useAuthRequest(
  {
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
    clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
    scopes: ["identity"],
    redirectUri: makeRedirectUri({
      scheme: "myapp",
    }),
  },
  githubAuthEndpoints
);

useEffect(() => {
  if (response?.type === "success") {
    const { code } = response.params;
    fetchAccessToken(code);
  }
}, []);

const handleGithubLogin = async () => {
  const result = await WebBrowser.openAuthSessionAsync(
    request?.url!,
    makeRedirectUri({
      scheme: "myapp",
    })
  );

  if (result.type === "success" && result.url) {
    const urlParams = new URLSearchParams(result.url.split("?")[1]);
    const code: any = urlParams.get("code");
    fetchAccessToken(code);
  }
};

const fetchAccessToken = async (code: string) => {
  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`,
    }
  );
  const tokenData = await tokenResponse.json();
  const access_token = tokenData.access_token;
  if (access_token) {
    fetchUserInfo(access_token);
  } else {
    console.error("Error fetching access token:", tokenData);
  }
};

const fetchUserInfo = async (token: string) => {
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = await userResponse.json();
  await authHandler({
    name: userData.name!,
    email: userData.email!,
    avatar: userData.avatar_url!,
  });
};
// github auth end
const authHandler = async ({
  name,
  email,
  avatar,
}: {
  name: string;
  email: string;
  avatar: string;
}) => {
  const user = {
    name,
    email,
    avatar,
  };
  const token = JWT.encode(
    {
      ...user,
    },
    process.env.EXPO_PUBLIC_JWT_SECRET_KEY!
  );
  const res = await axios.post(
    `${process.env.EXPO_PUBLIC_SERVER_URI}/login`,
    {
      signedToken: token,
    }
  );
  await SecureStore.setItemAsync("accessToken", res.data.accessToken);
  // await SecureStore.setItemAsync("name", name);
  // await SecureStore.setItemAsync("email", email);
  // await SecureStore.setItemAsync("avatar", email);

  setModalVisible(false);
  router.push("/(tabs)");
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
