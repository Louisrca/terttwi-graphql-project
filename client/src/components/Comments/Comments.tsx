import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { POST_COMMENT } from "../../api/comments/mutation";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import styles from "./Comments.module.css";
import { useAuth } from "../../context/AuthProvider";
import { GetCommentsByPostIdQuery } from "../../gql/graphql";
import { GET_COMMENTS_BY_POSTID } from "../../api/comments/query";

export const CommentForm = () => {
  const { id } = useParams();
  console.log("🚀 ~ CommentForm ~ postId:", id);
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data,
    loading: getCommentByIdLoading,
    error: getCommentByIdError,
    refetch,
  } = useQuery<GetCommentsByPostIdQuery>(GET_COMMENTS_BY_POSTID, {
    variables: {
      postId: id,
    },
  });

  const [createComment, { loading, error }] = useMutation(POST_COMMENT, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    if (!id) {
      console.error("ID du post manquant");
      return;
    }

    try {
      await createComment({
        variables: {
          content,
          postId: id,
        },
      });
      setContent("");
      setCharCount(0);
      refetch();

      if (window.location.pathname !== `/post/${id}`) {
        navigate(`/post/${id}`);
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire:", err);
    }
  };

  const MAX_CHARS = 500;

  if (getCommentByIdLoading) return <p>Loading...</p>;
  if (getCommentByIdError) return <p>Error: {getCommentByIdError.message}</p>;

  return (
    <div className={styles.formulaire}>
      <Box component="div" sx={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Écrivez votre commentaire..."
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            inputProps={{ maxLength: MAX_CHARS }}
            error={charCount >= MAX_CHARS}
            helperText={`${charCount}/${MAX_CHARS} caractères`}
            sx={{
              marginBottom: 2,
              bgcolor: "transparent",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiFormHelperText-root": { color: "lightgrey" },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setContent("")}
              variant="text"
              color="secondary"
              disabled={loading || content.length === 0}
            >
              Effacer
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !content.trim()}
              endIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Envoi..." : "Poster"}
            </Button>
          </Box>
        </form>
        <div>
          {data?.getCommentsByPostId && data.getCommentsByPostId.length > 0 ? (
            data.getCommentsByPostId.map((comment) => (
              <div className={styles.post}>
                <div className={styles.commentContent}>
                  <Typography
                    sx={{
                      paddingLeft: 2,
                      marginBottom: 1,
                      marginTop: 1,
                      fontWeight: "bold",
                    }}
                  >
                    @{comment?.user?.username}
                  </Typography>
                  <Typography
                    sx={{
                      paddingLeft: 5,
                      marginTop: 1,
                      paddingBottom: 2,
                    }}
                  >
                    {comment?.content}
                  </Typography>
                </div>
              </div>
            ))
          ) : (
            <Typography className={styles.noComments}>
              Aucun commentaire pour ce post !
            </Typography>
          )}
        </div>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Erreur: {error.message}
          </Alert>
        )}
      </Box>
    </div>
  );
};
