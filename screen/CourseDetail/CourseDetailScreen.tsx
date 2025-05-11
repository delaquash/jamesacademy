// import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
// import React, { useState } from 'react';
// import { useLocalSearchParams } from 'expo-router'
// import { useUserData } from '@/hooks/fetch/userData';
// import { useTheme } from '@/context/ThemeContext'
// import { fontSizes, IsAndroid, IsIPAD, SCREEN_WIDTH, windowHeight, windowWidth } from '@/themes/app.constant'
// import { scale, verticalScale } from 'react-native-size-matters';
// import { Ionicons } from '@expo/vector-icons';
// const CourseDetailScreen = () => {
//     const { theme } = useTheme()
//     const params: any = useLocalSearchParams()
//     const [activeButtopn, setActiveButtopn] = useState("About")
//     const {user, isLoading: userLoader } = useUserData()
//     const courseData: CourseType | any = params;
//     const prerequisites: BenefitsType[] | any = JSON.parse(params?.prerequisites);
//     const benefits: BenefitsType[] | any = JSON.parse(params?.benefits);
//     const courseContent: CourseDataType[] | any = JSON.parse(
//         params?.courseContent
//       );
//     return (
//         <View style={{ flex: 1, backgroundColor: theme.dark ? "#131313" : "#fff" }}>
//             <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//                 <View style={{ padding: windowWidth(25)}}>
//                 <Image
//             source={{
//               uri:
//                 courseData.slug ===
//                 "multi-vendor-mern-stack-e-commerce-project-with-all-functionalities-absolutely-for-beginners"
//                   ? "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574266/TMECA_yddc73.png"
//                   : courseData.slug ===
//                     "build-your-mobile-app-development-career-with-react-native"
//                   ? "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1731448241/thumbnail_jwi5xo.png"
//                   : "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1711468889/courses/spe7bcczfpjmtsdjzm6x.png",
//             }}
//             resizeMode="contain"
//             style={{
//               width: IsAndroid ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 25,
//               height: IsAndroid
//                 ? (SCREEN_WIDTH - 28) * 0.5625
//                 : (SCREEN_WIDTH - 40) * 0.5625,
//               alignSelf: "center",
//               borderRadius: windowWidth(10),
//             }}
//           />

//                     <Text
//                          style={{
//                             fontSize: fontSizes.FONT22,
//                             fontFamily: "Poppins_600SemiBold",
//                             paddingTop: verticalScale(10),
//                             color: theme.dark ? "#fff" : "#3E3B54",
//                             lineHeight: windowHeight(20),
//                           }}
//                     >
//                         {courseData.name}

//                     </Text>
//                     <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <Text
//                 style={{
//                   fontSize: fontSizes.FONT22,
//                   fontFamily: "Poppins_400Regular",
//                   paddingTop: windowHeight(8),
//                   color: theme.dark ? "#fff" : "#000",
//                   lineHeight: windowHeight(20),
//                 }}
//               >
//                 ${courseData?.price}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: fontSizes.FONT22,
//                   fontFamily: "Poppins_400Regular",
//                   color: theme.dark ? "#fff" : "#3E3B54",
//                   lineHeight: IsIPAD ? windowHeight(0) : windowHeight(20),
//                   paddingLeft: windowWidth(5),
//                   textDecorationLine: "line-through",
//                 }}
//               >
//                 ${courseData?.estimatedPrice}
//               </Text>
//             </View>
//             <Text
//               style={{
//                 fontSize: fontSizes.FONT18,
//                 fontFamily: "Poppins_400Regular",
//                 color: theme.dark ? "#fff" : "#000",
//               }}
//             >
//               {courseData?.purchased} Students
//             </Text>
//           </View>
//           {/* Course Prerequisites */}
//           <View style={{ paddingTop: windowWidth(20) }}>
//           <Text
//               style={{
//                 fontSize: fontSizes.FONT24,
//                 fontFamily: "Poppins_600SemiBold",
//                 paddingTop: windowHeight(8),
//                 color: theme.dark ? "#fff" : "#3E3B54",
//                 lineHeight: windowHeight(20),
//               }}
//             >
//               Course Prerequisites
//             </Text>
//             {prerequisites?.map((item: BenefitsType, index: number) => (
//                     <View
//                     key={index}
//                     style={{
//                       flexDirection: "row",
//                       paddingVertical: windowHeight(5),
//                     }}
//                   >
//                     <Ionicons
//                       name="checkmark-done-outline"
//                       size={scale(17)}
//                       color={theme.dark ? "#fff" : "#000"}
//                     />
//                     <Text
//                       style={{
//                         marginLeft: windowWidth(5),
//                         fontSize: fontSizes.FONT18,
//                         color: theme.dark ? "#fff" : "#000",
//                       }}
//                     >
//                       {item?.title}
//                     </Text>
//                   </View>
//             ))}
//           </View>
//           {/* Course Benefits */}
//           <View style={{ paddingTop: windowWidth(20) }}>
//           <Text
//               style={{
//                 fontSize: fontSizes.FONT24,
//                 fontFamily: "Poppins_600SemiBold",
//                 paddingTop: windowHeight(8),
//                 color: theme.dark ? "#fff" : "#3E3B54",
//                 lineHeight: windowHeight(20),
//               }}
//             >
//               Course Benefits
//             </Text>
//             {benefits.map((benefit: BenefitsType, index: number) => (
//                  <View
//                  key={index}
//                  style={{
//                    flexDirection: "row",
//                    paddingVertical: windowHeight(5),
//                  }}
//                >
//                  <Ionicons
//                    name="checkmark-done-outline"
//                    size={scale(17)}
//                    color={theme.dark ? "#fff" : "#000"}
//                  />
//                  <Text
//                    style={{
//                      marginLeft: windowWidth(5),
//                      fontSize: fontSizes.FONT18,
//                      color: theme.dark ? "#fff" : "#000",
//                    }}
//                  >
//                    {benefit?.title}
//                  </Text>
//                </View>
                
//             ))}
//           </View>
//           {/* Course Tabs */}
          
//                 </View>
//             </ScrollView>
//         </View>
//     )
// }

// export default CourseDetailScreen

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CourseDetailScreen = () => {
  return (
    <View>
      <Text>CourseDetailScreen</Text>
    </View>
  )
}

export default CourseDetailScreen

const styles = StyleSheet.create({})