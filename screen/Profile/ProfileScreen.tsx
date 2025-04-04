import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from 'react'
import { useUserData } from '@/hooks/fetch/userData'
import { useTheme } from '@/context/ThemeContext'
import { useFetchUser } from '@/hooks/fetch/fetchUserHook'
import { fontSizes, IsAndroid, IsHaveNotch, IsIPAD } from '@/themes/app.constant'
import { scale, verticalScale } from 'react-native-size-matters'
import { LinearGradient } from "expo-linear-gradient";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

const ProfileScreen = () => {
  const { theme } = useTheme()
  const {user, loader } = useFetchUser();
  const { data } = useUserData()
  return (
    <View
    style={[
      styles.container,
      {
        backgroundColor: theme.dark ? "#101010" : "#f5f5f5",
      },
    ]}
  >
    <LinearGradient
      colors={
        theme.dark
          ? ["#121121", "#3c43485c", "#121121"]
          : ["#6248FF", "#8673FC"]
      }
      start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
      end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
      style={styles.header}
    >
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View>
            <ThemeSwitcher />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    height: verticalScale(180),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    padding: scale(20),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSizes.FONT28,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
  profileWrapper: {
    width: scale(320),
    backgroundColor: "#fff",
    height: IsAndroid
      ? verticalScale(155)
      : !IsHaveNotch
      ? verticalScale(175)
      : IsIPAD
      ? verticalScale(185)
      : verticalScale(155),
    marginTop: verticalScale(-90),
    alignSelf: "center",
    borderRadius: scale(20),
    padding: scale(15),
    zIndex: 10,
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: verticalScale(10),
  },
  profileTextContainer: {
    marginBottom: verticalScale(10),
    marginLeft: scale(10),
  },
  profileName: {
    fontSize: fontSizes.FONT22,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  profileTitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_400Regular",
    color: "#8a8a8a",
    width: scale(230),
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(10),
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(120),
    height: verticalScale(62),
    borderRadius: scale(10),
    color: "#fff",
  },
  statNumber: {
    fontSize: fontSizes.FONT25,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: fontSizes.FONT20,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },

})