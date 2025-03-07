import { StyleSheet, Text, Pressable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg'
import { HEIGHT, WIDTH } from '@/config/constants';
import { scale, verticalScale } from 'react-native-size-matters';
import { fontSizes, SCREEN_WIDTH, windowHeight, windowWidth } from '@/themes/app.constant';

interface SlideProps {
  slide: onBoardingSlidesTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number
}

const Slide = ({ slide, index, setIndex, totalSlides }: SlideProps) => {

  const [modalVisible, setModalVisible] = useState(false)
  const handlePress = (index: number, setIndex:(index: number)=> void) => index === 2 ? setModalVisible(true) : setIndex(index +1 )

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id='gradient' cx="50%" cy="35%">
          <Stop offset="0%" stopColor={slide.color} />
          <Stop offset="100%" stopColor={slide.color} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="url(#gradient)"/>
    </Svg>
    <View style={styles.container}>
      <View>{slide.image}</View>
      <View>
        <View style={{ width: SCREEN_WIDTH * 1, paddingHorizontal: verticalScale(25)}}>
          <Text 
            style={{
              fontSize: fontSizes.FONT30,
              fontWeight: "600",
              color: "#85030D",
              fontFamily: "Poppins_600SemiBold",
            }}>
              {slide.title}
          </Text>
          <Text 
            style={{
              fontSize: fontSizes.FONT30,
              fontWeight: "600",
              color: "#85030D",
              fontFamily: "Poppins_600SemiBold",
            }}>
              {slide.secondTitle}
          </Text>
          <Text 
            style={{
              paddingVertical: verticalScale(4),
              fontSize: fontSizes.FONT30,
              color: "#3E3B54",
              fontFamily: "Poppins_300Light",
            }}>
              {slide.subTitle}
          </Text>



        </View>
      </View>
    </View>
    <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i)=> (
          <TouchableOpacity 
            key={i}
            style={[ styles.indicatorContainer, i === index && styles.activeIndicator]}
          />
        ))}
    </View>
        {/* Next Button */}
        {index <= totalSlides -1 && (
          <LinearGradient
            colors={["#6D55FE", "#8976FC"]}
            style={styles.nextButton}
          >
            <Pressable 
              onPress={()=>handlePress(index, setIndex)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
                  <Text style={styles.nextButtonText}>Next</Text>
              </Pressable>
            </LinearGradient>
        )}
    </>
  )
}

export default Slide

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(60),
    paddingTop: verticalScale(100),
    alignItems: 'center'
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(35),
    position: "absolute",
    bottom: verticalScale(55),
    left: scale(22)
  },
  indicator: {
    height: verticalScale(7),
    width: scale(18),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: scale(4),
    borderRadius: scale(4),
  },
  activeIndicator: {
    height: verticalScale(8),
    width: scale(40),
    backgroundColor: "white"
  },
  nextButton: {
    position: "absolute",
    zIndex: 999999999,
    right: windowWidth(25),
    bottom: windowHeight(50),
    marginTop: windowHeight(30),
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth(140),
    height: windowHeight(37),
    borderRadius: windowWidth(20)
  },
  nextButtonText: {
    color: "white",
    fontSize: fontSizes.FONT22,
    fontWeight: "bold"
  }
})