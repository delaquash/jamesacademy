import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@/context/ThemeContext'
import WelcomeHeader from '@/components/home/WelcomeHeader'
import HomeBanner from '@/components/home/HomeBanner'
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant'
import { scale, verticalScale } from 'react-native-size-matters'
import GradientText from '@/components/common/GradientText'
import SkeltonLoader from '@/utils/Skelton'


const HomeScreen = () => {
  const { theme } = useTheme()
  const [ loading, setLoading ] = useState(false)
  return (
    <>
      <LinearGradient
      colors={theme.dark ? ['#180D41', "#2A2D32", "#131313"] : ["#fff", "#f7f7f7"]}
      start={{ x: 0, y:0}}
      end={{ x: 0, y:1 }}
      style={{
        flex: 1,
        paddingTop: windowHeight(10), 
        backgroundColor: theme.dark ? "#101010" : "#fff"
      }}
    >
      <View style={{ marginBottom: verticalScale(10)}}>
        <WelcomeHeader />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeBanner />
          <View
            style={{
              marginHorizontal: windowWidth(20),
              marginTop: verticalScale(-25)
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: windowHeight(5)
              }}
            >
                <Text
                  style={{
                    fontSize: fontSizes.FONT35,
                    fontFamily: "Poppins_500Medium",
                    color: theme.dark ? "#fff" : "#000"
                  }}
                >
                  Popular {"  "}
                </Text>
                <GradientText 
                  text="Courses"
                  styles={{
                    fontSize: fontSizes.FONT35,
                    fontFamily: "Poppins_500Medium",
                    paddingLeft: scale(5)
                  }}
                />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#12BB70",
                      width: windowWidth(15),
                      height: windowWidth(15),
                      borderRadius: 100,
                    }}
                  />
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: fontSizes.FONT18,
                          paddingLeft: windowWidth(5),
                          color: theme.dark ? "#fff" : "#000",
                        }}
                      >
                          Our comprehensive project based courses
                      </Text>
                  </View>
              </View>
              {loading ? (
                <>
                  <SkeltonLoader />
                </>
              ) :( <View></View>)}
          </View>
      </ScrollView>
    </LinearGradient>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})