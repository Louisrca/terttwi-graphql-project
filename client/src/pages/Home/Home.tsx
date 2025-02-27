import Posts from "../../components/Posts/Posts";
import styles from "./Home.module.css";
import { useAuth } from "../../context/AuthProvider";

export default function Home() {
  const { logout } = useAuth();

  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeColonne}>
          <button onClick={logout}>Logout</button>
        </div>
        <div className={styles.homeColonne}>
          <Posts />
        </div>
        <div className={styles.homeColonne}></div>
      </div>
    </div>
  );
}
