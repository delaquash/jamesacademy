import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useQuery, useMutation } from "@tanstack/react-query";

interface IUser {
  name: string;
  email: string;
  avatar: string;
}

/**
 * Function to set the Authorization header for Axios requests.
 * Ensures every request includes the stored token.
 */
const setAuthorizationHeader = async () => {
  const token = await SecureStore.getItemAsync("token"); // Retrieve token from SecureStore
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default Authorization header
  }
};

/**
 * Function to fetch user data from API.
 * - Ensures Authorization header is set before making the request.
 * - Fetches user data from the backend.
 * - Stores user data securely in SecureStore.
 */
const fetchUserData = async ():Promise<IUser> => {
  await setAuthorizationHeader(); // Ensure Authorization header is set

  const res = await axios.get(`${process.env.EXPO_BASE_URL}/user`); // Fetch user data from API

  // Store user data securely in SecureStore
  await SecureStore.setItemAsync("name", res.data.user?.name);
  await SecureStore.setItemAsync("email", res.data.user?.email);
  await SecureStore.setItemAsync("avatar", res.data.user?.avatar);

  return res.data.user; // Return fetched user data
};

/**
 * Custom hook to fetch and manage user data using React Query.
 */
export const useFetchUser = () => {
  // useQuery: Fetches user data and caches it.
  const { data: { name, email, avatar } = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ["user"], // Unique key for caching
    queryFn: fetchUserData, // Function to fetch data
    retry: 2, // Number of retries on failure
  });

  // useMutation: Allows manual refetching of user data.
  const { mutate: refetchUser, error } = useMutation({
    mutationFn: fetchUserData, // Function to refetch data
    onSuccess: () => {
      refetch(); // Manually refetch user data after mutation
    },
  });

  return {
    name,
    email,
    avatar, // User data
    error, // Error from mutation
    isLoading, // Loading state
    isError, // Error state
    refetchUser, // Function to manually refetch user data
  };
};
