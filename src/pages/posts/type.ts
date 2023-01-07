import { PagePropTypes } from "./../../config/type";
import { ParsedUrlQuery } from "querystring";

import { Post, Comment } from "@/models";

export interface PostsPageProps {
  data?: Post[];
}

export interface PostPageProps {
  data: Post | null;
  comments: Comment[];
}

export interface PostPageParams extends ParsedUrlQuery {
  postId: string;
}

export type PostPageRequestParams = PagePropTypes & {
  keyword?: string;
};

export type PostDetailPageRequesParams = {
  postId: string;
};
