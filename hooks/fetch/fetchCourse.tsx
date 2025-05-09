import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define query key type
type CourseQueryKey = [string, { isProfile: boolean }];

const fetchCourse = async ({ queryKey }: QueryFunctionContext<CourseQueryKey>) => {
  const [_key, { isProfile }] = queryKey;
  
  // Using a single endpoint but passing isProfile as a query parameter
  try {
      // Using a single endpoint but passing isProfile as a query parameter
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/course/get-courses`, { params: { isProfile } });
    return res.data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
  
export const fetchCourseHook = (isProfile = false) => {
  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course", { isProfile }],
    queryFn: fetchCourse,
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });

  return {
    course,
    isLoading,
    error,
  };
};