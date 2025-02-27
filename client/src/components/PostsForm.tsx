import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import TextField from '@mui/material/TextField';

const CREATE_POST = graphql(`
  mutation CreatePost($token: String!, $content: String!) {
    createPost(token: $token, content: $content) {
      code
      message
      success
      post {
        user {
          username
        }
      }
    }
  }
`);

export default function PostsForm() {
  const [token, setToken] = useState(""); // À remplacer par une gestion d'authentification
  const [content, setContent] = useState("");

  console.log("content:", content);

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  console.log("data:", data);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ variables: { token, content } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start space-x-3">
        {data?.createPost && !data.createPost.success && (
          <p style={{ color: "red" }}>{data.createPost.message}</p>
        )}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <TextField
              multiline
              placeholder="ça dit quoi ?"
              maxRows={4}
              sx={{
                width: "100%",
              }}
            />

            <div>     
              <button type="submit">
                {loading ? "Posting..." : "Poster"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
