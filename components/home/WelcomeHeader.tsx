import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useUserData } from '@/hooks/fetch/userData'


const WelcomeHeader = () => {
    const {theme} = useTheme()
    const {data,isLoading, isError, error} = useUserData();

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error loading user data</Text>;

  return (
    <View>
      <Text>WelcomeHeader</Text>
    </View>
  )
}

export default WelcomeHeader

const styles = StyleSheet.create({})