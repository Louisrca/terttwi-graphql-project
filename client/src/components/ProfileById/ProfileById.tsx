import { GetPostByAuthorQuery } from "../../gql/graphql";
import { GET_POST_BY_USER } from "../../api/posts/query";
import styles from "./ProfileById.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import HeartIcon from "../../common/svg/HeartIcon";
import CommentIcon from "../../common/svg/CommentIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { TOGGLE_LIKE } from "../../api/like/mutation";

export default function ProfileById() {
  const { token } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery<GetPostByAuthorQuery>(
    GET_POST_BY_USER,
    {
      variables: {
        author: username,
      },
    }
  );

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
    if (!postId) return;

    try {
      await toggleLike({ variables: { postId } });
    } catch (err) {
      console.error("Erreur lors du like/unlike :", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.post}>
      <Typography
        variant="h5"
        sx={{
          marginLeft: 2,
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        Posts de{" "}
        <span style={{ fontWeight: "bold" }}>@{username ?? ""}</span>
      </Typography>
      <div>
        {data?.getPostByAuthor?.map((post) => (
          <>
            <div className={styles.postContainer}>
              <div key={post?.id} onClick={() => navigate(`/post/${post?.id}`)}>
                <Typography sx={{ paddingLeft: 2, marginBottom: 2 }}>
                  {post?.content}
                </Typography>
              </div>
              <div className={styles.postInteraction}>
                <div className={styles.postHeart}>
                  <HeartIcon
                    handleIsLiked={() => handleLikeToggle(post?.id || "")}
                    isActive={post?.isLiked || false}
                  />
                  <span className={styles.likeCount}>
                    {post?.numberOflikes || 0}
                  </span>
                </div>
                <div className={styles.postMessage}>
                  <CommentIcon
                    onClick={() => navigate(`/comment/${post?.id}`)}
                  />
                  <span className={styles.commentCount}>
                    {post?.comments?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
