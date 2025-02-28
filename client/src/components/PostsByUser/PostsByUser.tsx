import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, GET_POSTS_BY_USER } from "../../api/posts/query";
import styles from "./PostsByUser.module.css";
import { Button, Typography } from "@mui/material";
import UpdateUserPost from "./UpdateUserPost";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { DELETE_POST } from "../../api/posts/mutation";

export default function PostsByUser() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS_BY_USER);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      console.log("Post supprimé avec succès");
      refetch();
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
    },
  });
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  if (loading) return <p>Chargement...</p>;
  if (error)
    return (
      <Typography className={styles.noPost}>
        Tu n'as encore rien posté!{" "}
      </Typography>
    );

  const posts = (data?.getPostsByUser ?? []).filter((post) => post !== null);

  const handleEdit = (postId: string) => {
    setEditingPostId(postId);
  };

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

  return (
    <div>
      <h2>Mes Posts</h2>
      {posts.length > 0 ? (
        <>
          {editingPostId === null ? (
            posts.map((post) => (
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
                <div className={styles.editActions}>
                  <Button onClick={() => handleEdit(post.id)} color="primary">
                    <BrushOutlinedIcon />
                  </Button>
                  <Button color="error" onClick={() => handleDelete(post.id)}>
                    <DeleteOutlineIcon />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <UpdateUserPost
              data={data}
              postId={editingPostId}
              onCancel={() => setEditingPostId(null)}
            />
          )}
        </>
      ) : (
        <p>Tu n'as encore rien posté!</p>
      )}
    </div>
  );
}
