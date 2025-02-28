import { Button } from "@mui/material";
import { CommentForm } from "../../components/Comments/Comments";
import PostById from "../../components/Posts/PostById";
import styles from "./Comment.module.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router";

export default function Comment() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeColonne}>
          <div
            className={styles.homeColonne}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <Button color="primary" onClick={() => navigate(-1)}>
              <ArrowBackOutlinedIcon />
            </Button>
          </div>
        </div>
        <div className={styles.homeColonne} id={styles.homePostList}>
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
