export interface PostAuthor {
  id: string;
  name: string;
  photoUrl?: string;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  author: PostAuthor;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  likedByMe?: boolean;
}
