import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { JSX } from 'react/jsx-runtime';
import { useSharedValue } from "react-native-reanimated"
import { WaveEnum } from './wave';
import { useVector } from 'react-native-redash';
import { HEIGHT, MIN_LEDGE } from '@/config/constants';


interface SliderProps {
    index: number;
    setIndex: (value : number) => void;
    prev?: JSX.Element;
    next?: JSX.Element;
    children: JSX.Element;
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
    return (
        <>
        </>
    )
}

export default Slider
