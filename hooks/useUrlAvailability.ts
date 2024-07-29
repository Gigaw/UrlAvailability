import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const useUrlAvailability = (url: string) => {
  const [isUrlAvailable, setIsUrlAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkURL = async (url: string) => {
    setIsLoading(true);
    try {
      const request = await fetch(url);
      if (request.ok) {
        setIsUrlAvailable(true);
      } else {
        setIsUrlAvailable(false);
      }
    } catch (e) {
      setIsUrlAvailable(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    checkURL(url);
    return unsubscribe;
  }, [url]);

  return {
    isUrlAvailable,
    isLoading,
    isConnected,
  };
};

export default useUrlAvailability;
