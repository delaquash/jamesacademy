import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { setAuthorizationHeader } from "./fetchUserHook"; // Adjust import path as needed

// Define notification type if not already defined elsewhere
type NotificationType = {
  id: string | number;
  // Add other notification properties as needed
};

/**
 * Fetches all notifications
 */
export const fetchNotifications = async (): Promise<NotificationType[]> => {
  try {
    await setAuthorizationHeader();
    const endpoint = `${process.env.EXPO_PUBLIC_SERVER_URI}/get-notification`;
    const res = await axios.get(endpoint, { timeout: 10000 });
    
    if (res.data?.notification) {
      return res.data.notification;
    } else {
      return []; // Return empty array if no notifications
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

/**
 * Deletes a specific notification
 */
const deleteNotification = async (notification: NotificationType) => {
  try {
    await setAuthorizationHeader();
    const endpoint = `${process.env.EXPO_PUBLIC_SERVER_URI}/delete-notification/${notification.id}`;
    const res = await axios.delete(endpoint, { timeout: 10000 });
    return res.data.notification;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

/**
 * Custom hook to fetch and manage notifications
 */
export const useNotification = () => {
  const queryClient = useQueryClient();
  
  // Add state to control when the query runs
  const [isReady, setIsReady] = useState(false);
  
  // Delay query execution slightly to avoid bridge issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Fetch notifications
  const { 
    data: notificationsData = [], 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    enabled: isReady,
  });

  // Delete notification mutation
  const deleteMutation = useMutation({
    mutationFn: (notification: NotificationType) => deleteNotification(notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // Handler function to delete a notification
  const notificationDeleteHandler = (item: NotificationType) => {
    deleteMutation.mutate(item);
  };

  return {
    notificationsData,
    isLoading: !isReady || isLoading,
    isError,
    notificationDeleteHandler,
    isDeletingNotification: deleteMutation.isPending,
  };
};