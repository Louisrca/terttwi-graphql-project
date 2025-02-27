import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_LIKE } from "../../api/like/mutation";
import { GET_POSTS } from "../../api/posts/query";
import { GetPostsQuery } from "../../gql/graphql";
import styles from "./Posts.module.css";
import { Typography } from "@mui/material";
import HeartIcon from "../../common/svg/HeartIcon";

import CommentIcon from "../../common/svg/CommentIcon";

export default function Posts() {
  //   to change when the user is logged in, get from local storage
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZGFhY2VlLWI2M2UtNDk0OS04Y2JhLTgyZjA4Mzc0Zjg5OSIsInVzZXJuYW1lIjoibG91aXMiLCJpYXQiOjE3NDA2NjM0MjMsImV4cCI6MTc0MDc0OTgyM30.x8nGnqepC8FR5nnHS6pt9V0-_Ppt4NH6eaSnl_NWz-s";
  const { data, loading, error, refetch } = useQuery<GetPostsQuery>(GET_POSTS, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    onCompleted: () => {
      refetch();
    },
  });

  const handleLikeToggle = async (postId: string) => {
    console.log("Clicking on post:", postId);
    try {
      const result = await toggleLike({ variables: { postId } });
      console.log("Toggle result:", result);
    } catch (err) {
      console.error("Erreur lors du like/unlike :", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.getPosts?.map((post) => (
        <div key={post?.id ?? ""} className={styles.post}>
          <Typography sx={{ paddingLeft: 5, marginBottom: 1 }}>
            @{post?.user?.username ?? ""}
          </Typography>
          <Typography sx={{ paddingLeft: 5 }}>{post?.content}</Typography>
          <div className={styles.postInteraction}>
            <div className={styles.postHeart}>
              <HeartIcon
                handleIsLiked={() => handleLikeToggle(post?.id ?? "")}
                isActive={post?.isLiked ?? false}
              />
            </div>
            <div className={styles.postMessage}>
              <CommentIcon onClick={() => console.log("Commented")} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
