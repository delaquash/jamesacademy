import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

export default function index() {
    const [loggedInUser, setLoggedInUser] = useState(false)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const subscription = async () => {
            const token = Platform.OS === "web"
            ? await AsyncStorage.getItem("accessToken")
            : await SecureStore.getItemAsync("accessToken");
            setLoggedInUser(token ? true : false);
            setLoading(false);
        };
        subscription();
    }, []);
  return (
   <>
        {loading ? (
            <></>
        ): (
            <Redirect href={!loggedInUser ? "/(routes)/onboarding" : "/(tabs)"} />
        )}
   </>
  )
}
