import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@/context/ThemeContext'


const HomeScreen = () => {
  const { theme } = useTheme()
  return (
    <LinearGradient
      colors={theme.dark ? ['#180D41', "#2A2D32", "#131313"] : ["#fff", "#f7f7f7"]}
      start={{ x: 0, y:0}}
      end={{ x: 0, y:1 }}
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#101010" : "#fff"
      }}
    >
      <WelcomeHeader />
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})