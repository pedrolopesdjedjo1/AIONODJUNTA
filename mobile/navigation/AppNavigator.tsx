import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

export default function AppNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!token) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
