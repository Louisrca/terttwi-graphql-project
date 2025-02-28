import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_POST } from "../../api/posts/mutation";
import { GET_POSTS, GET_POSTS_BY_USER } from "../../api/posts/query";
import { GetPostsByUserQuery } from "../../gql/graphql";
import styles from "./PostsByUser.module.css";
import { Button, TextField, Typography } from "@mui/material";

interface UpdateUserPostProps {
  data: GetPostsByUserQuery | undefined;
  postId: string;
  onCancel: () => void;
}

export default function UpdateUserPost({
  data,
  postId,
  onCancel,
}: UpdateUserPostProps) {
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS_BY_USER }, { query: GET_POSTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      console.log("Post mis à jour avec succès");
      onCancel();
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
    },
  });
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const currentPost = data?.getPostsByUser?.find(
      (post) => post?.id === postId
    );
    if (currentPost?.content) {
      setEditedContent(currentPost.content);
    }
  }, [data, postId]);

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) return;

    try {
      await updatePost({
        variables: {
          id: postId,
          content: editedContent,
        },
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour du post:", err);
    }
  };

  const currentPost = data?.getPostsByUser?.find((post) => post?.id === postId);

  if (!currentPost) return <p>Post introuvable</p>;

  return (
    <div className={styles.post}>
      <Typography
        sx={{
          paddingLeft: 2,
          marginBottom: 1,
          marginTop: 1,
          fontWeight: "bold",
        }}
      >
        @{currentPost?.user?.username || "Utilisateur inconnu"}
      </Typography>

      <TextField
        fullWidth
        multiline
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        sx={{ padding: 2 }}
      />

      <div className={styles.editButtons}>
        <Button
          onClick={handleSaveEdit}
          color="primary"
          variant="contained"
          size="small"
        >
          Valider
        </Button>
        <Button onClick={onCancel} color="secondary" size="small">
          Annuler
        </Button>
      </div>
    </div>
  );
}
