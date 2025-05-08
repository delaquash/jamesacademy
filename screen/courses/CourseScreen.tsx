import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { fontSizes, IsAndroid, windowHeight, windowWidth } from '@/themes/app.constant';
import GradientText from '@/components/common/GradientText';
import { scale, verticalScale } from 'react-native-size-matters';
import { Skeleton } from 'moti/skeleton';
import { fetchCourseHook } from '@/hooks/fetch/fetchCourse';
import CourseCard from '@/components/card/CourseCard';

const CourseScreen = () => {
    const { theme } = useTheme()
    const bottomTabBarHeight = useBottomTabBarHeight();
    const {course, isLoading} = fetchCourseHook(true)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#131313" : "#fff",
      }}
    >
      <View
        style={{ marginTop: verticalScale(-35) }}
      >
        <StatusBar barStyle={!theme.dark ? "dark-content" : "light-content"} />
   
        {isLoading ? (
          <View>
            <Skeleton />
          </View>
        ) : (
          <View
              style={{
                    paddingBottom: theme.dark 
                    ? bottomTabBarHeight * 10
                    : IsAndroid 
                    ? bottomTabBarHeight * 10
                    : 0,
                    paddingHorizontal: scale(8)
                }}
          >
            <FlatList 
                data={course}
                ListHeaderComponent={()=>(
                    <View style={{ marginHorizontal: windowWidth(20) }}>
                    <View style={{ flexDirection: "row", marginTop: windowHeight(8) }}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: "Poppins_500Medium",
                          color: theme.dark ? "#fff" : "#000",
                        }}
                      >
                        Popular
                      </Text>
                      <GradientText
                        text="Courses"
                        styles={{
                          fontSizes: fontSizes.FONT35,
                          fontFamily: "Poppins_500SemiBold",
                          paddingLeft: scale(5),
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
                          marginTop: verticalScale(-18),
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: fontSizes.FONT18,
                          paddingLeft: windowWidth(5),
                          paddingBottom: windowHeight(20),
                          color: theme.dark ? "#fff" : "#000",
                        }}
                      >
                        Our Comprehensive Project Based Courses
                      </Text>
                    </View>
                  </View>
                )}
                renderItem={({ item }) => <CourseCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
               ListEmptyComponent={<Text>No course available</Text>}
                ListFooterComponent={()=> (
                                   <View style={{paddingBottom: theme.dark? verticalScale(40): verticalScale(10)}}>
               
                                   </View>
                                 )}
            
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default CourseScreen

const styles = StyleSheet.create({})