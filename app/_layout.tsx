import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const _layout = () => {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
      </Stack>
    </ThemeProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})