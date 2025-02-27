import { useMutation, useQuery } from "@apollo/client";
import { DELETE_LIKE, POST_LIKE } from "../../api/like/mutation";
import { GET_POSTS } from "../../api/posts/query";
import { GetPostsQuery } from "../../gql/graphql";
import styles from "./Posts.module.css";
import { Typography } from "@mui/material";
import HeartIcon from "../../common/svg/Hearticon";
import { useEffect, useState } from "react";
import CommentIcon from "../../common/svg/CommentIcon";

export default function Posts() {
  const { data, loading, error, refetch } = useQuery<GetPostsQuery>(GET_POSTS);
  const [likedPosts, setLikedPosts] = useState<Record<string, string | null>>(
    {}
  );
  // Token to change when the user is logged in, get from local storage
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxMGY4Y2RiLWFlZWQtNDEyZi1hODYwLTVjMGZkMDA0NTVlZiIsInVzZXJuYW1lIjoiRGFuIiwiaWF0IjoxNzQwNTcyODkxLCJleHAiOjE3NDA2NTkyOTF9.HatyvN4SkJz1DElzfm2VMoFE1vRZH8HNCr6C7yJ0V0U";

  const [createLike] = useMutation(POST_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  useEffect(() => {
    if (data?.getPosts) {
      const initialLikes = data.getPosts.reduce((acc, post) => {
        if (!post) return acc;
        acc[post.id] = post.likes?.[0]?.id || null;
        return acc;
      }, {} as Record<string, string | null>);
      setLikedPosts(initialLikes);
    }
  }, [data]);

  const handleLikeToggle = async (postId: string) => {
    const likeId = likedPosts[postId];

    try {
      if (likeId) {
        await deleteLike({ variables: { id: likeId, token } });
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: null,
        }));
      } else {
        const { data } = await createLike({ variables: { postId, token } });
        if (data?.createLike?.like?.id) {
          setLikedPosts((prev) => ({
            ...prev,
            [postId]: data?.createLike?.like?.id ?? null,
          }));
        }
      }
      refetch();
    } catch (err) {
      console.error("Erreur lors du like/unlike :", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.getPosts &&
        data?.getPosts.map((post) => (
          <div key={post?.id ?? ""} className={styles.post}>
            <Typography sx={{ paddingLeft: 5, marginBottom: 1 }}>
              @{post?.user?.username ?? ""}
            </Typography>
            <Typography sx={{ paddingLeft: 5 }}>{post?.content}</Typography>
            <div className={styles.postInteraction}>
              <div className={styles.postHeart}>
                <HeartIcon
                  handleIsLiked={() => handleLikeToggle(post?.id ?? "")}
                  isActive={!!likedPosts[post?.id ?? ""]}
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
