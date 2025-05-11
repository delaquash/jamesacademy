import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

// Define query key type
type CourseQueryKey = [string, { isProfile: boolean }];

// Import the authorization header setter if not already imported
import { setAuthorizationHeader } from "./fetchUserHook"; // Adjust import path as needed

const fetchCourse = async ({ queryKey }: QueryFunctionContext<CourseQueryKey>) => {
  try {
    // Set authorization header first
    await setAuthorizationHeader();
    
    const [_key, { isProfile }] = queryKey;
    
    // Using a single endpoint but passing isProfile as a query parameter
    const endpoint = `${process.env.EXPO_PUBLIC_SERVER_URI}/course/get-courses`;
    
    const res = await axios.get(endpoint, { 
      params: { isProfile },
      timeout: 10000 // Add timeout to prevent hanging requests
    });
    
    return res.data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
  
export const fetchCourseHook = (isProfile = false) => {
  // Add state to control when the query runs
  const [isReady, setIsReady] = useState(false);
  
  // Delay query execution slightly to avoid bridge issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course", { isProfile }],
    queryFn: fetchCourse,
    retry: 1, // Reduced retry count
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    enabled: isReady, // Only run query when component is fully mounted
  });

  return {
    course,
    isLoading: !isReady || isLoading,
    error,
  };
};