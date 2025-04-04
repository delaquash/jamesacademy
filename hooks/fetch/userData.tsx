// import { useEffect, useState } from "react";
// import * as SecureStore from "expo-secure-store";

// export const useUserData= () => {
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [avatar, setAvatar] = useState("")

//     useEffect(()=>{
//         const getUserData = async() => {
//             const name = await SecureStore.getItemAsync("name")
//             const email = await SecureStore.getItemAsync("email")
//             const avatar = await SecureStore.getItemAsync("avatar")
//             setName(name!)
//             setName(email!)
//             setName(avatar!)
//         }
//         getUserData()
//     })
//     return {name, email, avatar}
// }


import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

const fetchUserData = async (): Promise<UserData> => {
  const name = await SecureStore.getItemAsync('name');
  const email = await SecureStore.getItemAsync('email');
  const avatar = await SecureStore.getItemAsync('avatar');

  return {
    name: name ?? '',
    email: email ?? '',
    avatar: avatar ?? ''
  };
};

export const useUserData = () => {
  return useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1
  });
};