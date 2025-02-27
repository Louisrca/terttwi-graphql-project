import { Button } from "@mui/material";
import AllComments from "../../components/Comments/AllComments";
import PostById from "../../components/Posts/PostById";
import styles from "./PostsPage.module.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router";

export default function PostPage() {
  const navigate = useNavigate();
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
          <Button color="primary" onClick={() => navigate("/")}>
            <ArrowBackOutlinedIcon />
          </Button>
        </div>
        <div className={styles.homeColonne}>
          <div className="">
            <PostById />
          </div>
          <div className="">
            <AllComments />
          </div>
        </div>
        <div className={styles.homeColonne}></div>
      </div>
    </div>
  );
}
