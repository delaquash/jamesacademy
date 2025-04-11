import {
    ActivityIndicator,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { useTheme } from "@/context/ThemeContext";
  import { scale, verticalScale } from "react-native-size-matters";
  import { router } from "expo-router";
  import { AntDesign } from "@expo/vector-icons";
  import SupportBannerOne from "@/assets/svg/support-center/one";
  import SupportBannerTwo from "@/assets/svg/support-center/two";
  import SupportBannerThree from "@/assets/svg/support-center/three";
  import { fontSizes, IsHaveNotch, IsIPAD } from "@/themes/app.constant";
  import IconOne from "@/assets/svg/onboarding/icon-1";
  import IconTwo from "@/assets/svg/onboarding/icon-2";
  import IconThree from "@/assets/svg/onboarding/icon-3";
  import { BlurView } from "expo-blur";
import  { setAuthorizationHeader, useFetchUser } from "@/hooks/fetch/fetchUserHook";
  import axios from "axios";
const SupportCenter = () => {
    const { theme } = useTheme()
    const [open, setOpen] = useState(false)
    const [ticketTitle, setTicketTitle] = useState("")
    const [ticketDescription, setTicketDescription] = useState("")
    const [loader, setLoader] = useState(false)
  return (
    <ScrollView
        style={{
            flex: 1,
            backgroundColor: theme.dark ? "#101010" : "#fff",
        }}
        showsVerticalScrollIndicator={false}
    >
        {/* header options */}
        <View
            style={{
                height: verticalScale(300),
                overflow: "hidden",
                position: "relative",
                backgroundColor: theme.dark ? "#8673FC" : "#9DCDFF",
                paddingTop: verticalScale(45),
                paddingHorizontal: scale(20),
            }}
        >
            <Pressable
                style={{
                    width: scale(35),
                    height: scale(35),
                    backgroundColor: "#fff",
                    borderRadius: scale(5)
                }}
                onPress={()=> router.back()}
            >
                <AntDesign name="arrowleft" size={scale(22)} color="black" />
            </Pressable>
            <View style={{ flexDirection: "row"}}>
                <SupportBannerOne />
                <SupportBannerTwo />
                <SupportBannerThree />
            </View>
        </View>

        <View style={{ padding: scale(20) }}>
            <Text
                style={{
                    color: theme.dark ? "#fff" : "#000",
                    textAlign: "center",
                    fontSize: fontSizes.FONT30,
                    fontFamily: "Poppins_600SemiBold",
                }}
            >
                 Tell us how can we help 👋
            </Text>
            <Text
                style={{
                    color: theme.dark ? "#fff" : "#000",
                    textAlign: "center",
                    fontSize: fontSizes.FONT18,
                    fontFamily: "Poppins_400Regular",
                }}
            >
                We are always available to provide you with the best services we can
            </Text>
            <Pressable
                style={{
                    height: !IsHaveNotch 
                        ? verticalScale(65)
                        : IsIPAD
                        ? verticalScale(80)
                        :verticalScale(62),
                    backgroundColor: theme.dark ? "#3C43485c" : "#eaf3fb85",
                    borderRadius: scale(10),
                    shadowOpacity: 0.1,
                    shadowColor: "#40E0D0",
                    shadowRadius: 5,
                    padding: scale(10),
                    marginTop: verticalScale(20),
                    flexDirection: "row",
                    gap: scale(10),
                }}
                onPress={()=>setOpen(true)}
            >
                <IconOne />
                <View>
                    <Text
                        style={{
                            color: !theme.dark ? "#000" : "#fff",
                            fontSize: fontSizes.FONT22,
                            fontFamily: "Poppins_500Medium"
                        }}
                    >
                        Chat
                    </Text>
                    <Text
                        style={{
                            color: !theme.dark ? "#000" : "#fff",
                            fontSize: fontSizes.FONT20,
                            fontFamily: "Poppins_400Regular",
                            paddingTop: verticalScale(1),
                        }}
                     >
                            Start a conversation now!
                     </Text>
                </View>
            </Pressable>


            <Pressable
                style={{
                    height: !IsHaveNotch
                      ? verticalScale(65)
                      : IsIPAD
                      ? verticalScale(80)
                      : verticalScale(62),
                    backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
                    borderRadius: scale(10),
                    shadowOpacity: 0.1,
                    shadowColor: "#40E0D0",
                    shadowRadius: 5,
                    padding: scale(10),
                    marginTop: verticalScale(20),
                    flexDirection: "row",
                    gap: scale(10),
                }}
                // onPress={() => router.push("/(routes)/faq")}
            >
                <IconTwo />
                <View>
            <Text
              style={{
                color: !theme.dark ? "#000" : "#fff",
                fontSize: fontSizes.FONT22,
                fontFamily: "Poppins_500Medium",
              }}
            >
              FAQ's
            </Text>
            <Text
              style={{
                color: !theme.dark ? "#000" : "#fff",
                fontSize: fontSizes.FONT20,
                fontFamily: "Poppins_400Regular",
                paddingTop: verticalScale(1),
              }}
            >
              Find intelligent answers instantly
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={{
            height: !IsHaveNotch
              ? verticalScale(65)
              : IsIPAD
              ? verticalScale(80)
              : verticalScale(62),
            backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
            borderRadius: scale(10),
            shadowOpacity: 0.1,
            shadowColor: "#40E0D0",
            shadowRadius: 5,
            padding: scale(10),
            marginTop: verticalScale(20),
            flexDirection: "row",
            gap: scale(10),
          }}
          onPress={() => Linking.openURL("mailto:olaide1191@gmail.com")}
        >
          <IconThree />
          <View>
            <Text
              style={{
                color: !theme.dark ? "#000" : "#fff",
                fontSize: fontSizes.FONT22,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: !theme.dark ? "#000" : "#fff",
                fontSize: fontSizes.FONT20,
                fontFamily: "Poppins_400Regular",
                paddingTop: verticalScale(1),
              }}
            >
              Get solution directly to inbox
            </Text>
          </View>
        </Pressable>
      </View>-

      {open && (
        <Modal 
          animationType="fade"
          transparent={true}
          visible={open}
          onRequestClose={() => setOpen(false)}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setOpen(false)}
          >
            <BlurView
            intensity={ 90 }
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <Pressable
                onPress={(e)=> e.stopPropagation()}
                style={{
                  width: scale(300),
                  marginHorizontal: scale(50),
                  backgroundColor: theme.dark ? "#101010" : "#fff",
                  borderRadius: scale(10),
                  padding: scale(15),
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizes.FONT35,
                    textAlign: "center",
                    fontFamily: "Poppins_600SemiBold",
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Create a ticket
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT20,
                      fontFamily: "Poppins_500Medium",
                      color: theme.dark ? "#fff" : "#333",
                      paddingTop: verticalScale(5),
                    }}
                  >
                    Ticket Title *
                  </Text>
                  <TextInput
                      placeholder="I am encountering a problem"
                      placeholderTextColor={theme.dark ? "#fff" : "#333"}
                      style={{
                        height: verticalScale(30),
                        borderWidth: 1,
                        borderColor: theme.dark ? "#fff" : "#000",
                        marginVertical: verticalScale(5),
                        color: theme.dark ? "#fff" : "#000",
                        paddingLeft: scale(10),
                        fontSize: fontSizes.FONT18,
                        borderRadius: scale(5),
                      }}
                      value={ticketTitle}
                      onChangeText={(e)=>setTicketTitle(e)}

                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT20,
                      fontFamily: "Poppins_500Medium",
                      color: theme.dark ? "#fff" : "#000",
                      paddingTop: verticalScale(10),
                    }}
                  >
                    Ticket Description *
                  </Text>
                  <TextInput
                    placeholder="Problem explaination with details..."
                    multiline={true}
                    numberOfLines={6}
                    value={ticketDescription}
                    onChangeText={(e) => setTicketDescription(e)}
                    style={{
                      height: verticalScale(80),
                      borderWidth: 1,
                      borderColor: theme.dark ? "#fff" : "#333",
                      marginVertical: verticalScale(5),
                      color: theme.dark ? "#fff" : "#000",
                      paddingLeft: scale(10),
                      paddingTop: verticalScale(5),
                      fontSize: fontSizes.FONT18,
                      borderRadius: scale(5),
                      textAlignVertical: "top",
                    }}
                    placeholderTextColor={theme.dark ? "#fff" : "#000"}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2467EC",
                    paddingVertical: verticalScale(8),
                    borderRadius: scale(8),
                    marginTop: verticalScale(15)
                  }}
                  // onPress={()=> }
                >
                  {loader ?  (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    <Text
                    style={{
                      textAlign: "center",
                      color: "#FFFF",
                      fontSize: fontSizes.FONT22,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    Create

                    </Text>
                  )}
                </TouchableOpacity>
              </Pressable>
            </BlurView>
          </Pressable>
        </Modal>
      )}
    </ScrollView>
  )
}

export default SupportCenter

const styles = StyleSheet.create({})