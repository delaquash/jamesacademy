import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserData } from '@/hooks/fetch/userData'
import { useTheme } from '@/context/ThemeContext'
import { useFetchUser } from '@/hooks/fetch/fetchUserHook'

const ProfileScreen = () => {
  const { theme } = useTheme()
  const {user, loader } = useUserData()
  const { name, email, avatar} = useFetchUser()
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})