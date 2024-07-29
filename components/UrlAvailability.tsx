import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import useUrlAvailability from "@/hooks/useUrlAvailability";

interface Props {
  url: string;
}
const UrlAvailability = ({ url }: Props) => {
  const { isConnected, isLoading, isUrlAvailable } = useUrlAvailability(url);

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
