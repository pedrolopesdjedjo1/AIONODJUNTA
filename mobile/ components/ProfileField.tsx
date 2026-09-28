import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../constants/theme";

interface ProfileFieldProps {
  label: string;
  value?: string;
}

export default function ProfileField({
  label,
  value,
}: ProfileFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>
        {value?.trim() || "Não informado"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 14,
  },

  label: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: COLORS.black,
  },
});
