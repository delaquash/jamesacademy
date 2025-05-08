import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const CourseDetailScreen = () => {
    const params = useLocalSearchParams()
  return (
    <View>
      <Text>CourseDetailScreen</Text>
    </View>
  )
}

export default CourseDetailScreen

const styles = StyleSheet.create({})