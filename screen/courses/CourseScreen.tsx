import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const CourseScreen = () => {
    const { theme } = useTheme()
    const bottomTabBarHeight = useBottomTabBarHeight()
  return (
    <View>
      <Text>CourseScreen</Text>
    </View>
  )
}

export default CourseScreen

const styles = StyleSheet.create({})