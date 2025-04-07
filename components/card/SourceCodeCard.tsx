import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface Props {
    item: {
        url: string;
        title: string;
        thumbnail: string;
    }
}
const SourceCodeCard = ({item } : Props) => {
  return (
    <View>
      <Text>SourceCodeCard</Text>
    </View>
  )
}

export default SourceCodeCard

const styles = StyleSheet.create({})