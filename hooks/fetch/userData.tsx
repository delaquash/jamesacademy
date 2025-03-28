import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useUserData= () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(()=>{
        const getUserData = async() => {
            const name = await SecureStore.getItemAsync("name")
            const email = await SecureStore.getItemAsync("email")
            const avatar = await SecureStore.getItemAsync("avatar")
            setName(name!)
            setName(email!)
            setName(avatar!)
        }
        getUserData()
    })
    return {name, email, avatar}
}