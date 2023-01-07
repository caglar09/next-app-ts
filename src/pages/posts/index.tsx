import type { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "./post.module.css";

import type { PostsPageProps } from "./type";

import { Post } from "@/models";
import {
  getPosts,
  getRunningOperationPromises,
  RootState,
  useGetPostsQuery,
  wrapper,
} from "@/store";
import { useAppDispatch, useAppSelector } from "@/store";
import { nextPage, prevPage } from "@/store/features";
import Link from "next/link";

const Posts: NextPage<PostsPageProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const page = useAppSelector((store) => store.posts);
  const { filter } = page;

  const postResult = useGetPostsQuery(filter, { skip: router.isFallback });
  const { data, isFetching, isError, error } = postResult;
  // const { data, error } = { data: [] };

  if (isError) {
    return (
      <div>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>

      <Link href="/posts/new">Yeni Post</Link>

      {isFetching ? (
        <div>
          <h1>Yükleniyor</h1>
        </div>
      ) : (
        <ul className={styles.list}>
          {data?.map((post: Post) => {
            let text = `${post.id} ${post.title}`;
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>{text}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <button onClick={() => dispatch(prevPage())}>Önceki</button>
      <b>{filter._start}</b>
      <button onClick={() => dispatch(nextPage())}>Sonraki</button>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const state = store.getState();
    const { posts } = state;

    store.dispatch(getPosts.initiate(posts.filter));
    await Promise.all(getRunningOperationPromises());
    return {
      props: {},
    };
  }
);

export default Posts;
