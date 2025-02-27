import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_LIKE } from "../../api/like/mutation";
import { GET_POSTS, GET_POST_BY_POPULARITY } from "../../api/posts/query";
import { GetPostsQuery, GetPostsByPopularityQuery } from "../../gql/graphql";
import styles from "./Posts.module.css";
import { Typography } from "@mui/material";
import HeartIcon from "../../common/svg/HeartIcon";
import CommentIcon from "../../common/svg/CommentIcon";
import { useAuth } from "../../utils/useAuth";
import { useState } from "react";

export default function Posts() {
  const { token } = useAuth();
  const [orderByPopularity, setOrderByPopularity] = useState<boolean>();
  console.log("🚀 ~ Posts ~ orderByPopularity:", orderByPopularity);

  const { data, loading, error, refetch } = useQuery<
    GetPostsQuery | GetPostsByPopularityQuery
  >(orderByPopularity ? GET_POST_BY_POPULARITY : GET_POSTS, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    fetchPolicy: "cache-and-network", // Adjust based on how you want to handle caching
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

  const posts = orderByPopularity
    ? (data as GetPostsByPopularityQuery)?.getPostsByPopularity
    : (data as GetPostsQuery)?.getPosts;

  console.log("🚀 ~ Posts ~ posts:", posts);

  return (
    <div>
      <button
        onClick={() => {
          if (orderByPopularity) {
            setOrderByPopularity(true);
          } else {
            setOrderByPopularity(!orderByPopularity);
          }
        }}
      >
        by Popularity
      </button>
      {posts?.map((post) => (
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
