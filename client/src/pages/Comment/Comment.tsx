import { CommentForm } from "../../components/Comments/Comments";
import PostById from "../../components/Posts/PostById";
import styles from "./Comment.module.css";

export default function Comment() {
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeColonne}></div>
        <div className={styles.homeColonne}>
          <div className="">
            <PostById />
          </div>
          <div className="">
            <CommentForm />
          </div>
        </div>
        <div className={styles.homeColonne}></div>
      </div>
    </div>
  );
}
