import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from "react-native-swiper";
import * as WebBrowser from "expo-web-browser";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { IsIPAD } from '@/themes/app.constant';
import { bannerData } from '@/config/constants';

const HomeBanner = () => {
    const handlePress = async(item: string) => {
        await WebBrowser.openBrowserAsync(item)
    }
  return (
    <View style={styles.container}>
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
        style={{ height: IsIPAD ? moderateScale(240) : moderateScale(230)}}
      >
        {bannerData.map((banner, index: number)=> (
            <Pressable
                key={index}
                style={styles.slide}
                onPress={()=>handlePress(banner.url)}
            >
                <Image
                    source={{ uri: banner.image! }}
                    alt=''
                    style={{ 
                        height: IsIPAD ? moderateScale(200): moderateScale(185),
                        objectFit: "cover",
                        borderRadius: scale(5)
                    }}
                />
            </Pressable>
        ))}
      </Swiper>
    </View>
  )
}

export default HomeBanner

const styles = StyleSheet.create({
    container: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(7)
    },
    dot: {
        backgroundColor: "#C6C7CC",
        width: scale(8),
        height: scale(8),
        borderRadius: scale(5),
        marginHorizontal: verticalScale(3)
    },
    activeDot: {
        backgroundColor: "#2467EC",
        width: scale(8),
        height: scale(8),
        borderRadius: scale(5),
        marginHorizontal: verticalScale(3)
    },
    slide: {
        flex: 1,
        marginHorizontal: scale(10)
    }
})