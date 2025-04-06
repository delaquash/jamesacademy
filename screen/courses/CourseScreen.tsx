import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const CourseScreen = () => {
    const { theme } = useTheme()
    const bottomTabBarHeight = useBottomTabBarHeight()
  return (
   <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: theme.dark ? "#131313" : "#fff"
        }}
   >
    <ScrollView
        showsVerticalScrollIndicator={false}
    >
        <StatusBar 
            barStyle={!theme.dark ? "dark-content" : "light-content"}
        />
    </ScrollView>
   </SafeAreaView>
  )
}

export default CourseScreen

const styles = StyleSheet.create({})