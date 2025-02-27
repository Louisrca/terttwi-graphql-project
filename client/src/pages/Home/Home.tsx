import Posts from "../../components/Posts/Posts";
import { useAuth } from "../../utils/useAuth";
import styles from "./Home.module.css";

export default function Home() {
  const { loading, error } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeColonne}></div>
        <div className={styles.homeColonne}>
          <Posts />
        </div>
        <div className={styles.homeColonne}></div>
      </div>
    </div>
  );
}
