import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView} from "react-native-gesture-handler"
import { onBoardingSlides } from '@/config/constants'
import Slider from '@/components/onbarding/slider'
import Slide from '@/components/onbarding/slide';
import { useVector, snapPoint } from "react-native-redash";

const OnboardingScreen = () => {
    const [index, setIndex] = useState(0)
    const prev = onBoardingSlides[index-1]
    const next = onBoardingSlides[index+1]
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Slider 
            index={index}
            setIndex={setIndex}
            prev={prev && <Slide slide={prev} totalSlides={onBoardingSlides.length} />}
            next={next && <Slide slide={next} totalSlides={onBoardingSlides.length} />}
        >
        <Slide 
          slide={onBoardingSlides[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={onBoardingSlides.length}
        />
        
        </Slider>
    </GestureHandlerRootView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({})