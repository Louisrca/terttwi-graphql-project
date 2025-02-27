import { useState, useEffect } from "react";
import { GET_ME } from "../api/users/query";
import { useQuery } from "@apollo/client";
import { QueryQuery } from "../gql/graphql";

type AuthenticatedUser = {
  id: string;
  username: string;
};

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const { data, loading, error } = useQuery<QueryQuery>(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (token && data?.me) {
      setUser(data.me);
    }
  }, [data]);

  return { user, token, loading, error };
};
