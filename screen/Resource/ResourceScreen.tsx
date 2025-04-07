import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";


import { useTheme } from '@/context/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { verticalScale } from "react-native-size-matters";
import { videoLessonsData } from "@/config/constants";
import SourceCodeCard from "@/components/card/SourceCodeCard";
SourceCodeCard

const ResourceScreen = () => {
    const { theme } = useTheme()
    const bottomTabBarHeight = useBottomTabBarHeight()
  return (
   <SafeAreaView
    style={{
        flex: 1,
        backgroundColor: theme.dark ? "#131313" : "#fff"
    }}
   >
        <View
            style={{ paddingBottom: bottomTabBarHeight - 20}}
        >
            <FlatList 
              data={videoLessonsData}
              renderItem={({ item})=> <SourceCodeCard item={item} />}
              showsVerticalScrollIndicator={false}
              style={{
                padding:verticalScale(10),
              }}
            />
        </View>
   </SafeAreaView>
  )
}

export default ResourceScreen

const styles = StyleSheet.create({})