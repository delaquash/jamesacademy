import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { onBoardingSlides } from '@/config/constants'

const OnboardingScreen = () => {
    const [index, setIndex] = useState(0)
    const prev = onBoardingSlides[index-1]
    const next = onBoardingSlides[index+1]
  return (
    <View>
      <Text>OnboardingScreen</Text>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({})