import styles from "./ProfileById.module.css";

export default function ProfileById() {
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeColonne}></div>
        <div className={styles.homeColonne}>
          <div className="">louis</div>
          <div className="">{/* <CommentForm /> */}</div>
        </div>
        <div className={styles.homeColonne}></div>
      </div>
    </div>
  );
}
