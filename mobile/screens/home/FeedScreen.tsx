import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/PostCard";
import { COLORS } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import {
  getPosts,
  likePost,
  sharePost,
} from "../../services/posts";
import { Post } from "../../types/post";

export default function FeedScreen() {
  const { token } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const data = await getPosts(token);
      setPosts(data);
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as publicações."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function handleRefresh() {
    setRefreshing(true);

    await loadPosts();

    setRefreshing(false);
  }

  async function handleLike(post: Post) {
    if (!token) {
      return;
    }

    try {
      await likePost(token, post.id);
      await loadPosts();
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível curtir a publicação."
      );
    }
  }

  async function handleShare(post: Post) {
    if (!token) {
      return;
    }

    try {
      await sharePost(token, post.id);
      await loadPosts();
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível partilhar a publicação."
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      ListHeaderComponent={
        <CreatePost onCreated={loadPosts} />
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          Ainda não existem publicações.
        </Text>
      }
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onLike={() => handleLike(item)}
          onShare={() => handleShare(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: COLORS.lightGray,
    flexGrow: 1,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  empty: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: 16,
    paddingVertical: 40,
  },
});
