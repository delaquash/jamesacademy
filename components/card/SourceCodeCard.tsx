import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useTheme } from '@/context/ThemeContext';
import { fontSizes, SCREEN_WIDTH, windowHeight, windowWidth } from '@/themes/app.constant';
interface Props {
    item: {
        url: string;
        title: string;
        thumbnail: string;
    }
}
const SourceCodeCard = ({item } : Props) => {
    const { theme } = useTheme()
    /**
     * The handlePress function uses WebBrowser to open the URL 
     * specified in the item object
     * asynchronously.
     */
    const handlePress = async() => {
        await WebBrowser.openBrowserAsync(item.url)
    }
  return (
    <Pressable
        onPress={handlePress}
        style={{
            paddingHorizontal: windowWidth(20),
            paddingVertical: windowHeight(7),
          }}
    >
        <View style={[styles.card,{
            backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
          }]}>
            <Image 
                source={{ uri: item?.thumbnail}}
             style={{
            width: SCREEN_WIDTH - 52,
            height: (SCREEN_WIDTH - 40) * 0.5625,
            alignSelf: "center",
            borderRadius: windowWidth(5),
          }}
        />
        <View
          style={{
            paddingHorizontal: windowWidth(15),
            paddingBottom: windowHeight(5),
          }}
        >
          <Text
            style={{
              paddingTop: windowHeight(5),
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT18,
              color: theme.dark ? "#fff" : "#3E3B54",
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              paddingVertical: windowHeight(5),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          />
        </View>
        </View>
    </Pressable>
  )
}

export default SourceCodeCard

const styles = StyleSheet.create({
    card: {
        borderRadius: windowWidth(10),
        shadowOpacity: 0.1,
        shadowColor: "#40E0D0",
        shadowRadius: 5,
      },
})