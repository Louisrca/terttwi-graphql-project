import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_LIKE } from "../../api/like/mutation";
import { GET_POSTS, GET_POST_BY_POPULARITY } from "../../api/posts/query";
import { GetPostsQuery, GetPostsByPopularityQuery } from "../../gql/graphql";
import styles from "./Posts.module.css";
import { Typography, Button } from "@mui/material";
import HeartIcon from "../../common/svg/HeartIcon";
import CommentIcon from "../../common/svg/CommentIcon";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Posts() {
  const { token } = useAuth();
  const [orderByPopularity, setOrderByPopularity] = useState<boolean>(false);
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    data: regularData,
    loading: regularLoading,
    error: regularError,
    refetch: refetchRegular,
  } = useQuery<GetPostsQuery>(GET_POSTS, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    fetchPolicy: "cache-and-network",
    skip: orderByPopularity,
  });

  const {
    data: popularData,
    loading: popularLoading,
    error: popularError,
    refetch: refetchPopular,
  } = useQuery<GetPostsByPopularityQuery>(GET_POST_BY_POPULARITY, {
    variables: {
      isAsc: isAscending,
    },
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    fetchPolicy: "cache-and-network",
    skip: !orderByPopularity,
  });

  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    onCompleted: () => {
      if (orderByPopularity) {
        refetchPopular();
      } else {
        refetchRegular();
      }
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

  const toggleSortOrder = () => {
    if (orderByPopularity) {
      setIsAscending((prev) => !prev);
      refetchPopular();
    } else {
      setOrderByPopularity(true);
    }
  };

  const toggleViewMode = () => {
    setOrderByPopularity((prev) => !prev);
  };

  const loading = orderByPopularity ? popularLoading : regularLoading;
  const error = orderByPopularity ? popularError : regularError;
  const posts = orderByPopularity
    ? popularData?.getPostsByPopularity
    : regularData?.getPosts;

  return (
    <div className={styles.postsContainer}>
      <div className={styles.filterControls}>
        <Button
          variant="contained"
          color={orderByPopularity ? "primary" : "secondary"}
          onClick={toggleViewMode}
          sx={{ marginRight: 2 }}
        >
          {orderByPopularity ? "Voir posts récents" : "Voir posts populaires"}
        </Button>

        {orderByPopularity && (
          <Button variant="outlined" onClick={toggleSortOrder}>
            {isAscending ? "Plus populaires" : "Moins populaires"}
          </Button>
        )}
      </div>

      {loading && (
        <>
          <CircularProgress />
        </>
      )}
      {error && <p>Erreur: {error.message}</p>}

      {!loading && !error && posts?.length === 0 && <p>Aucun post trouvé</p>}

      <div className={styles.postsList}>
        {posts?.map((post) => (
          <div key={post?.id} className={styles.post}>
            <div>
              <Typography
                sx={{
                  paddingLeft: 2,
                  marginBottom: 1,
                  marginTop: 1,
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                  width: "fit-content",
                }}
                onClick={() =>
                  navigate(
                    `/profile/${post?.user?.username}?id=${post?.user?.id}`
                  )
                }
              >
                @{post?.user?.username || "Utilisateur inconnu"}
              </Typography>
              <div
                onClick={() => navigate(`/post/${post?.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Typography sx={{ paddingLeft: 2, marginBottom: 1 }}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
