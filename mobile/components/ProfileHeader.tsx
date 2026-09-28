import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../constants/theme";

interface ProfileHeaderProps {
  name: string;
  email?: string;
  photoUrl?: string;
}

export default function ProfileHeader({
  name,
  email,
}: ProfileHeaderProps) {
  const firstLetter = name?.trim()
    ? name.trim().charAt(0).toUpperCase()
    : "U";

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {firstLetter}
        </Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      {email && (
        <Text style={styles.email}>{email}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 38,
    fontWeight: "800",
    color: COLORS.white,
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.black,
    textAlign: "center",
  },

  email: {
    fontSize: 15,
    color: COLORS.gray,
    marginTop: 5,
  },
});
