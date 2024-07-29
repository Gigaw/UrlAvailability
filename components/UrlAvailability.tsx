import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

interface Props {
  url: string;
}
const UrlAvailability = ({ url }: Props) => {
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
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"orange"} />
      ) : (
        <>
          {isUrlAvailable && isConnected ? (
            <Text style={[styles.title, styles.green]}>Доступен</Text>
          ) : (
            <Text style={[styles.title, styles.red]}>Недоступен</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  yellow: {
    color: "orange",
  },
});

export default UrlAvailability;
