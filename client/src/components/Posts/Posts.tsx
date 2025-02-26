import { useMutation, useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import { GetPostsQuery } from "../../gql/graphql";
import styles from "./Posts.module.css";
import { Typography } from "@mui/material";
import HeartIcon from "../../common/svg/Hearticon";
import { useEffect, useState } from "react";

const GET_POSTS = graphql(`
  query GetPosts {
    getPosts {
      id
      content
      user {
        id
        username
      }
      numberOflikes
      likes {
        id
      }
      comments {
        id
        content
        user {
          id
          username
        }
      }
    }
  }
`);

const POST_LIKE = graphql(`
  mutation CreateLike($postId: ID!, $token: String!) {
    createLike(postId: $postId, token: $token) {
      id
      success
    }
  }
`);

const DELETE_LIKE = graphql(`
  mutation DeleteLike($likeId: ID!, $token: String!) {
    deleteLike(id: $likeId, token: $token) {
      success
    }
  }
`);

export default function Posts() {
  const { data, loading, error, refetch } = useQuery<GetPostsQuery>(GET_POSTS);
  const [likedPosts, setLikedPosts] = useState<Record<string, string | null>>(
    {}
  );
  const token = "TON_TOKEN_ICI"; // 🔴 À remplacer avec un token dynamique

  const [createLike] = useMutation(POST_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  // ⚡ Initialiser l’état des likes après avoir récupéré les données
  useEffect(() => {
    if (data?.getPosts) {
      const initialLikes = data.getPosts.reduce((acc, post) => {
        acc[post.id] = post.likedByUser?.id || null; // Stocke l'ID du like s'il existe
        return acc;
      }, {} as Record<string, string | null>);
      setLikedPosts(initialLikes);
    }
  }, [data]);

  const handleLikeToggle = async (postId: string) => {
    const likeId = likedPosts[postId];

    try {
      if (likeId) {
        // Si le post est déjà liké, on supprime le like
        await deleteLike({ variables: { likeId, token } });
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: null, // Supprime l'ID du like
        }));
      } else {
        // Sinon, on ajoute un like
        const { data } = await createLike({ variables: { postId, token } });
        if (data?.createLike?.id) {
          setLikedPosts((prev) => ({
            ...prev,
            [postId]: data.createLike.id, // Sauvegarde l'ID du like
          }));
        }
      }

      // Refetch pour avoir une vraie mise à jour du cache Apollo
      refetch();
    } catch (err) {
      console.error("Erreur lors du like/unlike :", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.getPosts.map((post) => (
        <div key={post.id} className={styles.post}>
          <Typography sx={{ paddingLeft: 5, marginBottom: 1 }}>
            @{post.user.username}
          </Typography>
          <Typography sx={{ paddingLeft: 5 }}>{post.content}</Typography>
          <div className={styles.postInteraction}>
            <div className={styles.postHeart}>
              <HeartIcon
                handleIsLiked={() => handleLikeToggle(post.id)}
                isActive={!!likedPosts[post.id]} // Active si un likeId existe
              />
            </div>
            <div className={styles.postMessage}>
              <svg
                width="24"
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
