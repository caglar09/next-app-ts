import styles from "./post.module.css";
import type { NextPage } from "next";
import type { PostDetailPageRequesParams } from "./type";
import { useRouter } from "next/router";

import { wrapper, useAppDispatch } from "@/store";
import { useAppSelector, addPost, setPost } from "@/store";
import { Post } from "@/models";

const NewPost: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  let { post } = useAppSelector((state) => state.posts);

  const onChangeValue = (event: any) => {
    const { name, value } = event.target;

    dispatch(setPost({ [name]: value }));
  };

  const handleSubmit = () => {
    const model = {
      body: post.body,
      title: post.title,
      userId: 1,
    } as Post;
    console.log(model);

    dispatch(addPost.initiate(model));
    router.back();
  };

  return (
    <div>
      <h1 className={styles.head}>Yeni Post</h1>

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
            key="title"
            type="text"
            name="title"
            defaultValue={post.title}
            onChange={(event) => onChangeValue(event)}
            placeholder="Post başlığı"
          />
        </div>
        <textarea
          key="body"
          name="body"
          defaultValue={post.body}
          onChange={(event) => onChangeValue(event)}
          style={{ minWidth: 400 }}
          rows={10}
        ></textarea>
        <br />
        <div>
          <button onClick={handleSubmit}>Post Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return {
      props: {},
    };
  }
);
