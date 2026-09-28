import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../constants/theme";
import { Post } from "../types/post";

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onShare: () => void;
}

export default function PostCard({
  post,
  onLike,
  onShare,
}: PostCardProps) {
  const date = new Date(post.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {post.author.name
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <View>
          <Text style={styles.author}>
            {post.author.name}
          </Text>

          <Text style={styles.date}>
            {date.toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text style={styles.content}>
        {post.content}
      </Text>

      <View style={styles.actions}>
        <Text
          style={[
            styles.action,
            post.likedByMe && styles.liked,
          ]}
          onPress={onLike}
        >
          {post.likedByMe ? "Curtido" : "Curtir"}{" "}
          {post.likesCount}
        </Text>

        <Text style={styles.action}>
          Comentários {post.commentsCount}
        </Text>

        <Text
          style={styles.action}
          onPress={onShare}
        >
          Partilhar {post.sharesCount}
        </Text>
      </View>
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
    marginBottom: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
  },

  author: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
  },

  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },

  content: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.black,
    marginBottom: 16,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },

  action: {
    fontSize: 13,
    color: COLORS.gray,
  },

  liked: {
    color: COLORS.green,
    fontWeight: "700",
  },
});
