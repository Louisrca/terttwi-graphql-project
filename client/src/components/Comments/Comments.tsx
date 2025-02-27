import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { POST_COMMENT } from "../../api/comments/mutation";
import { Button, TextField, Box, CircularProgress, Alert } from "@mui/material";
import styles from "./Comments.module.css";
import { useAuth } from "../../context/AuthProvider";

export const CommentForm = () => {
  const { id } = useParams();
  console.log("🚀 ~ CommentForm ~ postId:", id);
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();
  const { token } = useAuth();

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

      if (window.location.pathname !== `/post/${id}`) {
        navigate(`/post/${id}`);
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire:", err);
    }
  };

  const MAX_CHARS = 500;

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

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Erreur: {error.message}
          </Alert>
        )}
      </Box>
    </div>
  );
};
