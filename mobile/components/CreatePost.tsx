import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Button from "./Button";
import { COLORS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { createPost } from "../services/posts";

interface CreatePostProps {
  onCreated: () => void;
}

export default function CreatePost({
  onCreated,
}: CreatePostProps) {
  const { token } = useAuth();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!token) {
      return;
    }

    if (!content.trim()) {
      Alert.alert(
        "Atenção",
        "Escreva algo antes de publicar."
      );
      return;
    }

    try {
      setLoading(true);

      await createPost(
        token,
        content.trim()
      );

      setContent("");
      onCreated();
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível criar a publicação."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="O que está a acontecer?"
        value={content}
        onChangeText={setContent}
        multiline
        maxLength={5000}
      />

      <Button
        title="Publicar"
        onPress={handleCreate}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  input: {
    minHeight: 90,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
});
