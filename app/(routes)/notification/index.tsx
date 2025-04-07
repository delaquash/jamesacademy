import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationScreen from '@/screen/notification/NotificationScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Notification = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationScreen />
  </GestureHandlerRootView>
  )
}

export default Notification

const styles = StyleSheet.create({})