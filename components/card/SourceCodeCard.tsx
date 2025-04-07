import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useTheme } from '@/context/ThemeContext';
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
     * The handlePress function uses WebBrowser to open the URL specified in the item object
     * asynchronously.
     */
    const handlePress = async() => {
        await WebBrowser.openBrowserAsync(item.url)
    }
  return (
    <View>
      <Text>SourceCodeCard</Text>
    </View>
  )
}

export default SourceCodeCard

const styles = StyleSheet.create({

})