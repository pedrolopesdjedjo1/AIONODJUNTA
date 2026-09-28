import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Button from "../../components/Button";
import ProfileField from "../../components/ProfileField";
import ProfileHeader from "../../components/ProfileHeader";
import { COLORS } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  async function handleLogout() {
    Alert.alert(
      "Terminar sessão",
      "Deseja realmente sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <ProfileHeader
        name={user.name}
        email={user.email}
        photoUrl={user.photoUrl}
      />

      <View style={styles.card}>
        <ProfileField
          label="Nome"
          value={user.name}
        />

        <ProfileField
          label="Email"
          value={user.email}
        />

        <ProfileField
          label="Telefone"
          value={user.phone}
        />

        <ProfileField
          label="Tipo de conta"
          value={user.role}
        />

        <ProfileField
          label="Estado da conta"
          value={user.status}
        />
      </View>

      <Button
        title="Sair da conta"
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    padding: 24,
    paddingTop: 50,
  },

  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
});
