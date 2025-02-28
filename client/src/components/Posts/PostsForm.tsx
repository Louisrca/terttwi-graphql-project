import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import TextField from "@mui/material/TextField";
import styles from "./Posts.module.css";
import { GET_POSTS } from "../../api/posts/query";
import { CREATE_POST } from "../../api/posts/mutation";
import { useAuth } from "../../context/AuthProvider";

export default function PostsForm() {
  const { token } = useAuth();
  const [content, setContent] = useState("");

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    refetchQueries: [{ query: GET_POSTS }],
    awaitRefetchQueries: true,
  });

  if (error) {
    return <p style={{ color: "red" }}>{error.message}</p>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createPost({ variables: { content } });
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.formContainer}>
      {data?.createPost && !data.createPost.success && (
        <p style={{ color: "red" }}>{data.createPost.message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <TextField
            multiline
            placeholder="ça dit quoi ?"
            maxRows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              className: styles.inputField,
            }}
          />
          <button type="submit" className={styles.postButton}>
            {loading ? "Posting..." : "Poster"}
          </button>
        </div>
      </form>
    </div>
  );
}
