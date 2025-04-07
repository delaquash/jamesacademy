import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setAuthorizationHeader } from "./fetchUserHook";


export const fetchNotifications = async () => {
  await setAuthorizationHeader(); // Set the auth token in headers
  const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/get-notification`);
  return res.data.notification; // Return the array of notifications
};

// Delete a specific notification by its ID
const deleteNotification = async (notification: NotificationType) => {
  await setAuthorizationHeader(); // Set the auth token in headers
  const res = await axios.delete(
    `${process.env.EXPO_PUBLIC_SERVER_URI}/delete-notification/${notification.id}`
  );
  return res.data.notification; // Return deleted notification or message
};

// Custom hook to fetch and manage notifications
 export const useNotification = () => {
  const queryClient = useQueryClient(); // Used to manually refetch or update cache

  // useQuery for fetching notifications
  const { data: notificationsData = [], isLoading, isError } = useQuery({
    queryKey: ["notifications"], // Unique key for caching the data
    queryFn: fetchNotifications, // Function that fetches the notifications
    retry: 2, // Retry the request up to 2 times if it fails
  });

  // useMutation for deleting a notification
  const deleteMutation = useMutation({
    mutationFn: (notification: NotificationType) => deleteNotification(notification), // Function to delete a specific notification
    onSuccess: () => {
      // After successful deletion, refetch notifications to keep UI in sync
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // Handler function to trigger the mutation
  const notificationDeleteHandler = (item: NotificationType) => {
    deleteMutation.mutate(item); // Pass the notification to be deleted
  };

  // Return everything needed by the component
  return {
    notificationsData,         // List of notifications
    isLoading,                 // Loading state
    isError,                   // Error state
    notificationDeleteHandler, // Function to delete a notification
  };
};