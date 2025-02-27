import { GET_COMMENTS_BY_POSTID } from "../../api/comments/query";
import { DELETE_COMMENT, UPDATE_COMMENT } from "../../api/comments/mutation";
import { GetCommentsByPostIdQuery } from "../../gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import styles from "./Comments.module.css";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";

export default function AllComments() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const { data, loading, error, refetch } = useQuery<GetCommentsByPostIdQuery>(
    GET_COMMENTS_BY_POSTID,
    {
      variables: {
        postId: id,
      },
    }
  );

  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);

  const handleDelete = async (id: string) => {
    try {
      await deleteComment({
        variables: {
          id,
        },
      });
      refetch();
    } catch (err) {
      console.error("Erreur lors de la suppression du commentaire:", err);
    }
  };

  const handleEdit = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editedContent.trim()) return;

    try {
      await updateComment({
        variables: {
          id: commentId,
          content: editedContent,
        },
      });
      setEditingCommentId(null);
      refetch();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du commentaire:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={styles.postHeader}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Commentaires
        </Typography>
        <Button onClick={() => navigate(`/comment/${id}`)}>
          <CreateOutlinedIcon />
        </Button>
      </div>

      {data?.getCommentsByPostId && data.getCommentsByPostId.length > 0 ? (
        data.getCommentsByPostId.map((comment) => {
          if (!comment) return null;

          const isEditing = editingCommentId === comment.id;

          return (
            <div key={comment.id} className={styles.commentContainer}>
              {isEditing ? (
                <div className={styles.editContainer}>
                  <Typography
                    sx={{
                      marginBottom: 1,
                      marginTop: 1,
                      fontWeight: "bold",
                    }}
                  >
                    @{comment.user?.username}
                  </Typography>
                  <TextField
                    sx={{
                      marging: 2,
                      width: "100%",
                    }}
                    className={styles.editTextarea}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className={styles.editButtons}>
                    <Button
                      onClick={() => handleSaveEdit(comment.id)}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Valider
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      color="secondary"
                      size="small"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.post}>
                    <Typography
                      sx={{
                        paddingLeft: 2,
                        marginBottom: 1,
                        marginTop: 1,
                        fontWeight: "bold",
                      }}
                    >
                      @{comment.user?.username}
                    </Typography>
                    <Typography
                      sx={{
                        paddingLeft: 5,
                        marginTop: 1,
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </div>

                  {user?.id === comment.user?.id && (
                    <div className={styles.editActions}>
                      <Button
                        onClick={() =>
                          handleEdit(comment.id, comment.content || "")
                        }
                        color="primary"
                      >
                        <BrushOutlinedIcon />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })
      ) : (
        <Typography className={styles.noComments}>
          Aucun commentaire pour ce post !
        </Typography>
      )}
    </div>
  );
}
