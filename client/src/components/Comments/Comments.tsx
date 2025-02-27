import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import { POST_COMMENT } from "../../api/comments/mutation";
import { Button, TextField, Box } from "@mui/material";
import styles from "./Comments.module.css";

export const CommentForm = ({ token }: { token: string }) => {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [createComment, { data, loading, error }] = useMutation(POST_COMMENT);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }
    try {
      if (postId)
        await createComment({ variables: { content, token, postId } });
      setContent("");
    } catch (err) {
      console.error("Erreur", err);
    }
  };

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
            sx={{
              marginBottom: 2,
              bgcolor: "transparent", // Fond transparent
              color: "white", // Texte blanc
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" }, // Bordure blanche
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputLabel-root": { color: "white" }, // Label blanc
              "& .MuiInputBase-input": { color: "white" }, // Texte saisi blanc
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {" "}
            {/* Bouton aligné à droite */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Envoi..." : "Poster"}
            </Button>
          </Box>
        </form>

        {error && <p style={{ color: "red" }}>Erreur: {error.message}</p>}
        {data && data.createComment && <p>Commentaire posté !</p>}
      </Box>
    </div>
  );
};
