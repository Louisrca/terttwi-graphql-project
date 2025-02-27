import { GET_POSTS_BY_ID } from "../../api/posts/query";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useParams } from "react-router";
import styles from "./Posts.module.css"

export default function PostById() {
    const {id} = useParams();

    if(!id){
        return "No ID "
    }
    const { data, loading, error } = useQuery(GET_POSTS_BY_ID, {
      variables: { id }
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const post = data?.getPost;

  if (!post) return <p>Post not found</p>;

  return (
    <div className={styles.post}>
      <Typography sx={{ paddingLeft: 5, marginBottom: 1 }}>
        @{post.user?.username ?? "Unknown"}
      </Typography>
      <Typography sx={{ paddingLeft: 5 }}>{post.content}</Typography>
    </div>
  );
}
