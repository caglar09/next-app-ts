interface Comment {
  id: number|string;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type { Comment };
