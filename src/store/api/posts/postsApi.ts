import { PostDetailPageRequesParams } from "./../../../pages/posts/type";
import { PostPageRequestParams } from "@/pages/posts/type";
import { Post, Comment } from "@/models";

import { api } from "../index";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Array<Post>, PostPageRequestParams>({
      query: (args) => {
        return {
          url: `/posts?_start=${args._start * args.limit}&_limit=${args.limit}`,
        };
      },
      transformResponse: (response: Array<Post>) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "all" },
            ]
          : [{ type: "Posts", id: "all" }],
    }),
    getPost: builder.query<Post, PostDetailPageRequesParams>({
      query: (params) => `posts/${params.postId}`,
      transformResponse: (response: Post) => response,
      providesTags: (result, error, id) => [
        {
          type: "Post" as const,
          id: result?.id,
        },
      ],
    }),
    getPostComments: builder.query<Comment[], PostDetailPageRequesParams>({
      query: (params) => `posts/${params.postId}/comments`,
      transformResponse: (response: Comment[]) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments" as const, id })),
              { type: "Comments", id: "all" },
            ]
          : [{ type: "Comments", id: "all" }],
    }),
    addComment: builder.mutation<Comment, Comment>({
      query: (body) => ({
        url: `comments`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: Comment) => response,
      invalidatesTags: ["Comments", "Post"],
    }),
    addPost: builder.mutation<Post, Post>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: Post) => response,
      invalidatesTags: ["Posts"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useLazyGetPostQuery,
  useLazyGetPostsQuery,
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
  useAddCommentMutation,
  usePrefetch,
  util: { getRunningOperationPromises },
} = postApi;

export const { getPosts, getPost, getPostComments, addComment, addPost } =
  postApi.endpoints;
