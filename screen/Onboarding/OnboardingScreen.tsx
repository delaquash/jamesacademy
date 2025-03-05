import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView} from "react-native-gesture-handler"
import { onBoardingSlides } from '@/config/constants'
import Slider from '@/components/onbarding/slider'

const OnboardingScreen = () => {
    const [index, setIndex] = useState(0)
    const prev = onBoardingSlides[index-1]
    const next = onBoardingSlides[index+1]
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Slider 
        
        />
    </GestureHandlerRootView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({})