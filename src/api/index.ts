import { BASE_URL } from "@/config";

const getRequest = async (uri: string) => {
  const url = new URL(uri, BASE_URL);
  return fetch(url, { method: "GET" });
};

const getPosts = async () => {
  return getRequest("/posts").then((res) => res.json());
};

const getPost = async (postId: string) => {
  return getRequest(`/posts/${postId}`).then((res) => res.json());
};

const getPostComments = async (postId: string) => {
  return getRequest(`/posts/${postId}/comments`).then((res) => res.json());
};

const getCommentsByPostId = async (postId: string) => {
  return getRequest(`/comments?postId=${postId}`).then((res) => res.json());
};

export { getPosts, getPostComments, getCommentsByPostId, getPost };
