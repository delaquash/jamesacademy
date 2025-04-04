import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserData } from '@/hooks/fetch/userData'
import { useTheme } from '@/context/ThemeContext'
import { useFetchUser } from '@/hooks/fetch/fetchUserHook'

const ProfileScreen = () => {
  const { theme } = useTheme()
  const {user, loader } = useFetchUser();
  const { data } = useUserData()
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  }
  
})