import { GET_COMMENTS_BY_POSTID } from "../../api/comments/query";
import { GetCommentsByPostIdQuery } from "../../gql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import styles from "../Posts/Posts.module.css";

export default function AllComments() {
  const { id } = useParams();

  const { data, loading, error } = useQuery<GetCommentsByPostIdQuery>(
    GET_COMMENTS_BY_POSTID,
    {
      variables: {
        postId: id,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Commentaires</h2>
      {data?.getCommentsByPostId && data.getCommentsByPostId.length > 0 ? (
        data?.getCommentsByPostId?.map((comments) => (
          <div className={styles.post}>
            <Typography sx={{ paddingLeft: 5, marginBottom: 1 }}>
              @{comments?.user?.username ?? ""}
            </Typography>
            <Typography sx={{ paddingLeft: 5 }}>{comments?.content}</Typography>
          </div>
        ))
      ) : (
        <>
          <span>Aucun commentaire pour ce post !</span>
        </>
      )}
    </div>
  );
}
