import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCourse = async ({ queryKey }) => {
  const [_key, { isProfile }] = queryKey;
  
  // Using a single endpoint but passing isProfile as a query parameter
  const endpoint = `${process.env.EXPO_PUBLIC_SERVER_URI}/course/get-courses`;
  
  const res = await axios.get(endpoint, { 
    params: { isProfile } 
  });
  
  return res.data.courses;
};
  
export const fetchCourseHook = (isProfile = false) => {
  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course", { isProfile }],
    queryFn: fetchCourse,
    retry: 3,
  });

  return {
    course,
    isLoading,
    error,
  };
};