import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

// Define user type if not already defined elsewhere
type UserType = {
  name: string;
  email: string;
  avatar: string;
  // Add other user properties as needed
};

/**
 * Sets authorization header for all axios requests
 */
export const setAuthorizationHeader = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error setting authorization header:", error);
  }
};

/**
 * Fetches user data from API
 */
const fetchUserData = async (): Promise<UserType> => {
  try {
    await setAuthorizationHeader();
    
    const endpoint = `${process.env.EXPO_PUBLIC_SERVER_URI}/user`;
    const res = await axios.get(endpoint, { timeout: 10000 });
    
    if (res.data?.user) {
      // Store user data securely
      await Promise.all([
        SecureStore.setItemAsync("name", res.data.user?.name || ""),
        SecureStore.setItemAsync("email", res.data.user?.email || ""),
        SecureStore.setItemAsync("avatar", res.data.user?.avatar || "")
      ]);
      
      return res.data.user;
    } else {
      throw new Error("User data not found in response");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

/**
 * Custom hook to fetch and manage user data
 */
export const useFetchUser = () => {
  // Add state to control when the query runs
  const [isReady, setIsReady] = useState(false);
  
  // Delay query execution slightly to avoid bridge issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Fetch user data
  const { 
    data: user, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    enabled: isReady, // Only run query when ready
  });

  // Mutation for manual refetching
  const { 
    mutate: refetchUser, 
    isPending: isMutating,
    error 
  } = useMutation({
    mutationFn: fetchUserData,
    onSuccess: () => {
      refetch();
    },
  });

  return {
    user,
    error,
    loader: !isReady || isLoading || isMutating,
    isError,
    refetchUser,
  };
};