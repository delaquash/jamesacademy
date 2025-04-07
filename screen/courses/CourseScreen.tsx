import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import GradientText from '@/components/common/GradientText';
import { scale, verticalScale } from 'react-native-size-matters';
import { Skeleton } from 'moti/skeleton';

const CourseScreen = () => {
    const { theme } = useTheme()
    const bottomTabBarHeight = useBottomTabBarHeight();
    const [loading, setLoading] = useState(true)
  return (
   <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: theme.dark ? "#131313" : "#fff"
        }}
   >
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: verticalScale(-35) }}
    >
        <StatusBar 
            barStyle={!theme.dark ? "dark-content" : "light-content"}
        />
        <View
            style={{marginHorizontal: windowWidth(20)}}
        >
            <View
                style={{ flexDirection: "row", marginTop: windowHeight(8)}}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontFamily: "Poppins_500Medium",
                        color: theme.dark ? "#fff" : "#000"
                    }}
                >
                    Popular
                </Text>
                <GradientText 
                    text='Courses'
                    styles={{
                        fontSizes: fontSizes.FONT35,
                        fontFamily: "Poppins_500SemiBold",
                        paddingLeft: scale(5)
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#12BB70",
                        width: windowWidth(15),
                        height: windowWidth(15),
                        borderRadius: 300,
                        marginTop: verticalScale(-18)
                    }}
                />
                    <Text
                        style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: fontSizes.FONT18,
                            paddingLeft: windowWidth(5),
                            paddingBottom: windowHeight(20),
                            color: theme.dark? "#fff" : "#000"
                        }}
                    >
                        Our Comprehensive Project Based Courses
                    </Text>
            </View>
        </View>
        {loading ? (
            <View>
                <Skeleton />
            </View>) : (
                <View>

                </View>
            )}
    </ScrollView>
   </SafeAreaView>
  )
}

export default CourseScreen

const styles = StyleSheet.create({})