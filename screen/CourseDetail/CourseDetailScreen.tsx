import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router'
import { useUserData } from '@/hooks/fetch/userData';

const CourseDetailScreen = () => {
    const params: any = useLocalSearchParams()
    const [activeButtopn, setActiveButtopn] = useState("About")
    const {user, isLoading: userLoader } = useUserData()
    const courseData: CourseType | any = params;
    const prerequisites: BenefitsType[] | any = JSON.parse(params?.prerequisites);
    const benefits: BenefitsType[] | any = JSON.parse(params?.benefits);
    const courseContent: CourseDataType[] | any = JSON.parse(
        params?.courseContent
      );
    return (
        <View>
        <Text>CourseDetailScreen</Text>
        </View>
    )
}

export default CourseDetailScreen

const styles = StyleSheet.create({})