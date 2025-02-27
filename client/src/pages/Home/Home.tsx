import Posts from "../../components/Posts/Posts";
import styles from "./Home.module.css";

export default function Home() {
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
