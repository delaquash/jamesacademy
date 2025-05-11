// import { useQuery } from '@tanstack/react-query';
// import * as SecureStore from 'expo-secure-store';


// const getUserSession = async ():Promise<UserType>=> {
//   const [name, email, avatar] = await Promise.all([
//     SecureStore.getItemAsync("name"),
//     SecureStore.getItemAsync("email"),
//     SecureStore.getItemAsync("avatar"),
//   ]);

//   return {
//     name: name || "",
//     email: email || "",
//     avatar: avatar || "",
//   };
// };

// export const useUserData=()=> {
//   const { data: user, isLoading, isError } = useQuery({
//     queryKey: ["userData"],
//     queryFn: getUserSession,
//   });

//   return {
//     name: user?.name ?? "",
//     email: user?.email ?? "",
//     avatar: user?.avatar ?? "",
//     user,
//     isLoading,
//     isError,
//   };
// }

import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
// import { useDelayedQuery } from '../path/to/query-client-provider'; // Adjust import path as needed

// Define user type if not already defined elsewhere
type UserType = {
  name: string;
  email: string;
  avatar: string;
  // Add other user properties as needed
};

/**
 * Retrieves user session data from secure storage
 */
const getUserSession = async (): Promise<UserType> => {
  try {
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
  } catch (error) {
    console.error("Error retrieving user session data:", error);
    // Return default values in case of error
    return {
      name: "",
      email: "",
      avatar: "",
    };
  }
};

/**
 * Custom hook to access user data from secure storage
 */
export const useUserData = () => {
  // Use the delayed query hook to prevent RCTMessageThread errors
  // const { isReady } = useDelayedQuery();
  
  const { 
    data: user, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    // enabled: isReady, // Only run query when ready
  });

  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    avatar: user?.avatar ?? "",
    user,
    isLoading:isLoading,
    isError,
  };
};