import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { GetPostsQuery } from "../gql/graphql";

const GET_POSTS = graphql(`
  query GetPosts {
    getPosts {
      id
      content
      user {
        id
        username
      }
      comments {
        id
        content
        user {
          id
          username
        }
      }
    }
  }
`);

export default function Posts() {
  const { data, loading, error } = useQuery<GetPostsQuery>(GET_POSTS);

  if (error) {
    console.error(error);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.getPosts) {
    return <p>No data</p>;
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        data.getPosts &&
        data.getPosts.map(
          (post) =>
            post && (
              <div key={post.id ?? ""}>
                <h2>{post.content ?? ""}</h2>
                <p>By: {post?.user?.username ?? ""}</p>
                <ul>
                  {post.comments &&
                    post.comments.map(
                      (comment) =>
                        comment && (
                          <li key={comment.id}>
                            <p>{comment.content}</p>

                            <p>By: {comment.user?.username ?? "Unknown"}</p>
                          </li>
                        )
                    )}
                </ul>
              </div>
            )
        )}
    </div>
  );
}
