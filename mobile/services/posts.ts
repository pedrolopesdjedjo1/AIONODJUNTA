import { api } from "./api";
import { Post } from "../types/post";

export async function getPosts(
  token: string
): Promise<Post[]> {
  return api.get<Post[]>("/api/posts", token);
}

export async function createPost(
  token: string,
  content: string
): Promise<Post> {
  return api.post<Post>(
    "/api/posts",
    { content },
    token
  );
}

export async function likePost(
  token: string,
  postId: string
): Promise<void> {
  await api.post(
    `/api/posts/${postId}/like`,
    {},
    token
  );
}

export async function sharePost(
  token: string,
  postId: string
): Promise<void> {
  await api.post(
    `/api/posts/${postId}/share`,
    {},
    token
  );
}
