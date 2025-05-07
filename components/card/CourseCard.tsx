import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { IsAndroid, SCREEN_WIDTH, windowHeight, windowWidth } from '@/themes/app.constant'
import { useTheme } from '@/context/ThemeContext'

const CourseCard = ({ item }: {item: CourseType}) => {
  const { theme } = useTheme()
  return (
   <Pressable
      style={{ paddingHorizontal: windowWidth(5), paddingVertical: windowHeight(5)}}
   >
    <View
      style={[styles.card, { backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85" }]}
    >
      <Image
          source={{
            uri:
              item.slug ===
              "multi-vendor-mern-stack-e-commerce-project-with-all-functionalities-absolutely-for-beginners"
                ? "https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574266/TMECA_yddc73.png"
                : item.slug ===
                  "build-your-mobile-app-development-career-with-react-native"
                ? "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1731448241/thumbnail_jwi5xo.png"
                : "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1711468889/courses/spe7bcczfpjmtsdjzm6x.png",
          }}
          resizeMode="contain"
          style={{
            width: IsAndroid ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 52,
            height: IsAndroid
              ? (SCREEN_WIDTH - 28) * 0.5625
              : (SCREEN_WIDTH - 40) * 0.5625,
            alignSelf: "center",
            borderRadius: windowWidth(10),
          }}
        />

    </View>
   </Pressable>
  )
}

export default CourseCard

const styles = StyleSheet.create({
  card: {
    borderRadius: windowWidth(10),
    shadowOpacity: 0.1,
    shadowColor: "#40E0D0",
    shadowRadius: 5
  }
})