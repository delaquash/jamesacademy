import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';


const getUserSession = async ():Promise<UserType>=> {
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
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserSession,
  });

  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    avatar: user?.avatar ?? "",
    isLoading,
    isError,
  };
}