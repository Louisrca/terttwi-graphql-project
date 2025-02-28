import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS_BY_USER } from "../../api/posts/query";
import styles from "./Posts.module.css";
import { Typography } from "@mui/material";
import { DELETE_POST, UPDATE_POST } from "../../api/posts/mutation";
import { useState } from "react";

export default function MyPost() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS_BY_USER);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  const posts = (data?.getPostsByUser ?? []).filter((post) => post !== null);

/*
  const [deletePost] = useMutation(DELETE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deletePost({
        variables: {
          id,
        },
      });
      refetch();
    } catch (err) {
      console.error("Erreur lors de la suppression du post:", err);
    }
  };
  const handleEdit = (postId: string, currentContent: string) => {
    setEditingPostId(postId);
    setEditedContent(currentContent);
  };
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editedContent.trim()) return;

    try {
      await updatePost({
        variables: {
          id: commentId,
          content: editedContent,
        },
      });
      setEditingPostId(null);
      refetch();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du commentaire:", err);
    }
  };*/

  return (
    <div>
      <h2>Mes Posts</h2>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div key={post?.id} className={styles.post}>
              <Typography
                sx={{
                  paddingLeft: 2,
                  marginBottom: 1,
                  marginTop: 1,
                  fontWeight: "bold",
                }}
              >
                @{post?.user?.username || "Utilisateur inconnu"}
              </Typography>
              <Typography sx={{ paddingLeft: 2, marginBottom: 1 }}>
                {post?.content}
              </Typography>
            </div>
          ))}
        </>
      ) : (
        <p>Aucun post trouvé.</p>
      )}
    </div>
  );
}
