import styles from "./post.module.css";
import type { NextPage } from "next";
import type { PostPageProps, PostDetailPageRequesParams } from "./type";
import { useRouter } from "next/router";

import {
  getPost,
  getPostComments,
  getRunningOperationPromises,
  useGetPostQuery,
  useGetPostCommentsQuery,
  wrapper,
  useAppDispatch,
} from "@/store";
import { useAppSelector, addComment, setComment } from "@/store";
import { ChangeEvent } from "react";
import { Comment } from "@/models";
import { nanoid } from "nanoid";

const Post: NextPage<PostPageProps> = () => {
  const router = useRouter();
  const params = router.query! as PostDetailPageRequesParams;
  const dispatch = useAppDispatch();
  let { comment } = useAppSelector((state) => state.posts);
  const { data, isLoading } = useGetPostQuery(params, {
    skip: router.isFallback,
  });
  const { data: comments, isLoading: commentIsLoading } =
    useGetPostCommentsQuery(params, {
      skip: router.isFallback,
    });

  const onChangeValue = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);

    dispatch(setComment({ [name]: value }));
  };

  const handleSubmit = () => {
    console.log("comment", comment);

    const model = {
      name: comment.name,
      email: comment.email,
      body: comment.body,

      postId: Number(params.postId),
    } as Comment;
    dispatch(addComment.initiate(model));
  };

  return (
    <div>
      <h1 className={styles.head}>{data?.title}</h1>
      <p>{data?.body}</p>

      <hr />
      <h3>Comments: </h3>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id} style={{ marginBottom: 10 }}>
            {comment.name}
            <br />
            {comment.body}
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <input
            key="name"
            type="text"
            name="name"
            defaultValue={comment.name}
            onChange={(event) => onChangeValue(event)}
            placeholder="adınız"
          />
          <input
            key="email"
            type="text"
            name="email"
            defaultValue={comment.email}
            onChange={(event) => onChangeValue(event)}
            placeholder="email adreisniz"
          />
        </div>
        <textarea
          key="bodya"
          name="body"
          defaultValue={comment.body}
          onChange={(event) => onChangeValue(event)}
          style={{ minWidth: 400 }}
          rows={10}
        ></textarea>
        <br />
        <div>
          <button onClick={handleSubmit}>Yorum Yap</button>
        </div>
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const params = context.params! as PostDetailPageRequesParams;
    store.dispatch(getPost.initiate(params));
    store.dispatch(getPostComments.initiate(params));
    await Promise.all(getRunningOperationPromises());
    return {
      props: {
        data: {},
        comments: [],
      },
    };
  }
);
