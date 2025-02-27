import AllComments from "../../components/Comments/AllComments";
import PostById from "../../components/Posts/PostById";
import styles from './PostsPage.module.css'

export default function PostPage() {
    return (
        <div>
        <div className={styles.homeContainer}>
          <div className={styles.homeColonne}>
          </div>
          <div className={styles.homeColonne}>
            <div className="">
                <PostById />
            </div>
            <div className="">
                <AllComments/>
            </div>
          </div>
          <div className={styles.homeColonne}>
  
          </div>
        </div>
      </div>
    );
  }
  