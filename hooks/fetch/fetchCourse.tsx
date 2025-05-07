import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCourse = async ({ queryKey }: { queryKey: [string, { isProfile: boolean }] }) => {
    const [_key, { isProfile }] = queryKey;
  
    const endpoint = isProfile
      ? `${process.env.EXPO_PUBLIC_SERVER_URI}/course/get-profile-courses`
      : `${process.env.EXPO_PUBLIC_SERVER_URI}/course/get-courses`;
  
    const res = await axios.get(endpoint);
    return res.data.courses;
  };
  

export const fetchCourseHook = (isProfile: boolean) => {
    const { data: course, isLoading, error} = useQuery({
    queryKey: ["course", { isProfile }],
        queryFn: fetchCourse,
        retry: 3,
    });

    return {
        course,
        error,
        isLoading,
    };
};