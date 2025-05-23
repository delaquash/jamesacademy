// import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
// import React from 'react'
// import { fontSizes, IsAndroid, SCREEN_WIDTH, windowHeight, windowWidth } from '@/themes/app.constant'
// import { useTheme } from '@/context/ThemeContext'
// import { Feather } from '@expo/vector-icons'
// import { scale } from 'react-native-size-matters'
// import Ratings from '@/utils/Ratings'
// import { useRouter } from 'expo-router'

// const CourseCard = ({ item }: {item: CourseType}) => {
//   const { theme } = useTheme()
//   const router = useRouter()

//   const handleNavigation = () => {
//     router.push({
//       pathname: "/(routes)/course-details/index",
//       params: {
//         ...(item as any),
//         prerequisites: JSON.stringify(item.prerequisites),
//         courseContent: JSON.stringify(item.courseData),
//         benefits: JSON.stringify(item.benefits)
//         // Add other necessary primitive values
//       }
//     });
//   };
//   return (
//    <Pressable
//    onPress={handleNavigation}
//       style={{ paddingHorizontal: windowWidth(5), paddingVertical: windowHeight(5)}}
//    >
//     <View
//       style={[styles.card, { backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85" }]}
//     >
//       <Image
//           source={{
//             uri:
//               item.slug ===
//               "multi-vendor-mern-stack-e-commerce-project-with-all-functionalities-absolutely-for-beginners"
//                 ? "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574266/TMECA_yddc73.png"
//                 : item.slug ===
//                   "build-your-mobile-app-development-career-with-react-native"
//                 ? "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1731448241/thumbnail_jwi5xo.png"
//                 : "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1711468889/courses/spe7bcczfpjmtsdjzm6x.png",
//           }}
//           resizeMode="contain"
//           style={{
//             width: IsAndroid ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 52,
//             height: IsAndroid
//               ? (SCREEN_WIDTH - 28) * 0.5625
//               : (SCREEN_WIDTH - 40) * 0.5625,
//             alignSelf: "center",
//             borderRadius: windowWidth(10),
//           }}
//         />
//       <View
//           style={{
//             paddingHorizontal: windowWidth(15),
//             paddingBottom: windowHeight(5),
//           }}
//         >
//           <Text
//             style={{
//               paddingTop: windowHeight(5),
//               fontFamily: "Poppins_400Regular",
//               fontSize: fontSizes.FONT18,
//               color: theme.dark ? "#fff" : "#3E3B54",
//             }}
//           >
//             {item.name}
//           </Text>
//           <View
//             style={{
//               paddingVertical: windowHeight(5),
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <Ratings rating={item.ratings} />
//             <Text
//               style={{
//                 fontFamily: "Poppins_400Regular",
//                 color: !theme.dark ? "#3E3B54" : "#fff",
//                 fontSize: fontSizes.FONT18,
//               }}
//             >
//               {item?.purchased} Students
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingBottom: windowHeight(5),
//             }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <Text
//                 style={{
//                   fontFamily: "Poppins_400Regular",
//                   fontSize: fontSizes.FONT20,
//                   color: !theme.dark ? "#000" : "#fff",
//                 }}
//               >
//                 {item.price === 0 ? "Free" : item.price + "$"}
//               </Text>
//               <Text
//                 style={{
//                   fontFamily: "Poppins_400Regular",
//                   fontSize: fontSizes.FONT20,
//                   paddingLeft: windowWidth(5),
//                   marginTop: windowHeight(-5),
//                   textDecorationLine: "line-through",
//                   color: !theme.dark ? "#3E3B54" : "#fff",
//                 }}
//               >
//                 {item.estimatedPrice}$
//               </Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Feather
//                 name="list"
//                 size={scale(20)}
//                 color={theme.dark ? "#fff" : "#3E3B54"}
//               />
//               <Text
//                 style={{
//                   fontFamily: "Poppins_400Regular",
//                   fontSize: fontSizes.FONT20,
//                   color: !theme.dark ? "#3E3B54" : "#fff",
//                   paddingLeft: windowWidth(5),
//                 }}
//               >
//                 {item?.courseData?.length} Lectures
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//    </Pressable>
//   )
// }

// export default CourseCard

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: windowWidth(10),
//     shadowOpacity: 0.1,
//     shadowColor: "#40E0D0",
//     shadowRadius: 5
//   }
// })

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CourseCard = () => {
  return (
    <View>
      <Text>CourseCard</Text>
    </View>
  )
}

export default CourseCard

const styles = StyleSheet.create({})