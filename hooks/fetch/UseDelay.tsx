// * Hook to delay React Query execution to prevent RCTMessageThread errors

import React from "react";

export const useDelayedQuery = () => {
  const [isReady, setIsReady] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { isReady };
};