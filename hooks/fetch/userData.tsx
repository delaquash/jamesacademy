import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';


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


const getUserSession = async () => {
  const [name, email, avatar] = await Promise.all([
    SecureStore.getItemAsync("name"),
    SecureStore.getItemAsync("email"),
    SecureStore.getItemAsync("avatar"),
  ]);

  return {
    name: name || "",
    email: email || "",
    avatar: avatar || "",
  };
};

export default function useUserData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserSession,
  });

  return {
    name: data?.name ?? "",
    email: data?.email ?? "",
    avatar: data?.avatar ?? "",
    isLoading,
    isError,
  };
}