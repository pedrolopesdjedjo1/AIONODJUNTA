import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "../../components/Button";
import { COLORS } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.name}>
          {user?.name || "Utilizador"}
        </Text>

        {user?.email && (
          <Text style={styles.info}>{user.email}</Text>
        )}

        {user?.phone && (
          <Text style={styles.info}>{user.phone}</Text>
        )}
      </View>

      <Button
        title="Sair"
        onPress={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 24,
  },

  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 8,
  },

  info: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 5,
  },
});
