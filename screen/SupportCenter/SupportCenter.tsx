import {
    ActivityIndicator,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { useTheme } from "@/context/theme.context";
  import { scale, verticalScale } from "react-native-size-matters";
  import { router } from "expo-router";
  import { AntDesign } from "@expo/vector-icons";
  import SupportBannerOne from "@/assets/svgs/support-center/one";
  import SupportBannerTwo from "@/assets/svgs/support-center/two";
  import SupportBannerThree from "@/assets/svgs/support-center/three";
  import { fontSizes, IsHaveNotch, IsIPAD } from "@/themes/app.constant";
  import IconOne from "@/assets/svgs/onboarding/icon-1";
  import IconTwo from "@/assets/svgs/onboarding/icon-2";
  import IconThree from "@/assets/svgs/onboarding/icon-3";
  import { BlurView } from "expo-blur";
  import useUser, { setAuthorizationHeader } from "@/hooks/fetch/useUser";
  import axios from "axios";
const SupportCenter = () => {
  return (
    <View>
      <Text>SupportCenter</Text>
    </View>
  )
}

export default SupportCenter

const styles = StyleSheet.create({})