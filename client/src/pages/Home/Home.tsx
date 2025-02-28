import Posts from "../../components/Posts/Posts";
import styles from "./Home.module.css";
import { useAuth } from "../../context/AuthProvider";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Button } from "@mui/material";
import PostsForm from "../../components/Posts/PostsForm";

export default function Home() {
  const { logout } = useAuth();

  return (
    <div>
      <div className={styles.homeContainer}>
        <div
          className={styles.homeColonne}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Button onClick={logout} color="error">
            <LogoutOutlinedIcon />
          </Button>
        </div>
        <div className={styles.homeColonne} id={styles.homePostList}>
          <div className="">
            <PostsForm />
          </div>
          <Posts />
        </div>
        <div className={styles.homeColonne}></div>
      </div>
    </div>
  );
}
