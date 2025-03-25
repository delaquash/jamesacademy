import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";

// Function to set the Authorization header for Axios requests
export const setAuthorizationHeader = async () => {
    const token = await SecureStore.getItemAsync("token"); // Retrieve the stored token
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default header for axios
    }
};

// Custom hook to fetch user data
export const fetchUserHook = () => {
    const [user, setUser] = useState(); // State to store user data
    const [loader, setLoader] = useState(false); // State to track loading state
    const [shouldRefetch, setShouldRefetch] = useState(false); // State to trigger refetching

    // Function to fetch user data
    const fetchUserData = useCallback(async () => {
        setLoader(true); // Set loading to true before fetching data
        try {
            await setAuthorizationHeader(); // Ensure Authorization header is set before making API call
            const res = await axios.get(`${process.env.EXPO_BASE_URL}/user`); // API request to fetch user data
            
            // Store user data securely in SecureStore
            await SecureStore.setItemAsync("name", res.data.name);
            await SecureStore.setItemAsync("email", res.data.email);
            await SecureStore.setItemAsync("avatar", res.data.avatar);
            
            setUser(res.data.user); // Update state with fetched user data
        } catch (error) {
            console.log("Error:", error); // Log errors if request fails
        } finally {
            setLoader(false); // Set loading to false after fetching data
        }
    }, []); 
    /**
     * useCallback is used to **memoize** the `fetchUserData` function.
     * - This prevents the function from being recreated on every re-render.
     * - The empty dependency array `[]` means that `fetchUserData` is created only once when the component mounts.
     * - If dependencies were added (e.g., `[someDependency]`), the function would be re-created only when those dependencies change.
     */

    useEffect(() => {
        fetchUserData(); // Fetch user data when the component mounts
        return () => setShouldRefetch(false); // Cleanup function to reset `shouldRefetch`
    }, [shouldRefetch, fetchUserData]); 
    /**
     * The effect runs when `shouldRefetch` or `fetchUserData` changes.
     * - When `shouldRefetch` is set to `true`, the effect will trigger `fetchUserData` again.
     * - `fetchUserData` is already memoized using `useCallback`, preventing unnecessary re-renders.
     */

    // Function to trigger refetch
    const refetch = () => {
        setShouldRefetch(true); // Set `shouldRefetch` to `true`, triggering `useEffect` to fetch data again
    };

    return {
        user, // User data
        loader, // Loading state
        refetch, // Function to manually trigger data refetch
    };
};

// export default fetchUserHook;
