import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";

export default function HomeMainScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AIONÔDJUNTA</Text>

      <Text style={styles.title}>
        Bem-vindo{user?.name ? `, ${user.name}` : ""}!
      </Text>

      <Text style={styles.subtitle}>
        Juntos somos mais fortes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: COLORS.green,
    textAlign: "center",
  },
});
