import React, {  useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import { JSX } from 'react/jsx-runtime';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { WaveEnum } from '@/config/constants';
import { snapPoint, useVector } from 'react-native-redash';
import { HEIGHT, LEFT_SNAP_POINTS, MARGIN_WIDTH, MIN_LEDGE, NEXT, PREV, RIGHT_SNAP_POINTS, WIDTH } from '@/config/constants';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Wave from './wave';


interface SliderProps {
    index: number;
    setIndex: (value : number) => void;
    prev?: JSX.Element;
    next?: JSX.Element;
    children?: JSX.Element;
}

const Slider = ({ children: current, index,setIndex,next,prev}: SliderProps) => {
    const hasNext = !!next;
    const hasPrev = !!prev;
    const zIndex = useSharedValue(0);
    const activeWaveSide = useSharedValue(WaveEnum.NONE);
    const isTransitionLeft = useSharedValue(false)
    const isTransitionRight = useSharedValue(false)
    const left = useVector(MIN_LEDGE, HEIGHT / 2)
    const right = useVector(MIN_LEDGE, HEIGHT / 2)

    const pandGesture = Gesture.Pan().onStart(({ x })=> {
        if(x <= MARGIN_WIDTH && hasPrev) {
            (activeWaveSide.value = WaveEnum.LEFT),(zIndex.value = 100);
        } else if ( x >= WIDTH - MARGIN_WIDTH && hasNext){
            activeWaveSide.value = WaveEnum.RIGHT
        } else {
            activeWaveSide.value = WaveEnum.NONE
        }
    }).onUpdate(({ x, y})=> {
        if(activeWaveSide.value ==WaveEnum.LEFT){
            left.x.value = Math.max(x, MARGIN_WIDTH)
            left.y.value = y;
        } else if( activeWaveSide.value ==WaveEnum.RIGHT){
            right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH)
        }
    }).onEnd(({ x, velocityX, velocityY})=>{
        if(activeWaveSide.value === WaveEnum.LEFT){
            const dest = snapPoint(x, velocityX, LEFT_SNAP_POINTS)
            isTransitionLeft.value = dest === PREV;
            left.x.value = withSpring(
                dest, {
                    velocity: velocityX,
                    overshootClamping: isTransitionLeft.value ? true : false,
                    restSpeedThreshold: isTransitionLeft.value ? 100 : 0.01,
                    restDisplacementThreshold: isTransitionLeft.value ? 100 : 0.01

                }, ()=> {
                    if(isTransitionLeft.value){
                        runOnJS(setIndex)(index-1)
                    } else {
                        zIndex.value = 0;
                        activeWaveSide.value = WaveEnum.NONE
                    }
                }
            );
            left.y.value = withSpring(HEIGHT / 2, {velocity: velocityY})
        } else if (activeWaveSide.value === WaveEnum.RIGHT){
            const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINTS)
            isTransitionRight.value = dest === NEXT;
            left.x.value = withSpring(
                WIDTH - dest,
                {
                    velocity: velocityX,
                    overshootClamping: isTransitionRight.value ? true : false,
                    restSpeedThreshold: isTransitionRight.value ? 100 : 0.01,
                    restDisplacementThreshold: isTransitionRight.value ? 100 : 0.01

                },
                ()=> {
                    if(isTransitionRight.value){
                        runOnJS(setIndex)(index + 1)
                    } else {
                        activeWaveSide.value = WaveEnum.NONE
                    }
                }
            );
            right.y.value = withSpring(HEIGHT / 2, {velocity: velocityY})
        }
    })

    const leftStyle = useAnimatedStyle(()=>({
        zIndex: zIndex.value
    }))

    useEffect(()=> {
        if(Platform.OS === "ios"){
            right.x.value = withSpring(WIDTH * 0.167)
        } else {
            left.x.value = withSpring(WIDTH * 0.185)
        }
    }, [left, right])
    return (
        <GestureDetector gesture={pandGesture}>
            <Animated.View style={StyleSheet.absoluteFill}>
                {current}
                {prev && 
                    (
                        <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
                            <Wave 
                                side={WaveEnum.LEFT}
                                position={left}
                                isTransitioning={isTransitionLeft}
                            
                            >
                               {prev}
                            </Wave>
                        </Animated.View>
                    )
                }
                {next && (
                    <View style={StyleSheet.absoluteFill}>
                        <Wave 
                            side={WaveEnum.RIGHT}
                            position={right}
                            isTransitioning={isTransitionRight}    
                        >
                               {next}
                            </Wave>
                    </View>
                )}
            </Animated.View>
        </GestureDetector>
    )
}

export default Slider
