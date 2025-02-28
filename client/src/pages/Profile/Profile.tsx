import React from "react";
import ProfileById from "../../components/ProfileById/ProfileById";
import styles from "./Profile.module.css";
import { Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div>
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
              id={
                styles.homePostList
              }
            >
              <Button color="primary" onClick={() => navigate(-1)}>
                <ArrowBackOutlinedIcon />
              </Button>
            </div>
          </div>
          <div className={styles.homeColonne}>
            <div className=""></div>
            <div className="">
              {" "}
              <ProfileById />
            </div>
          </div>
          <div className={styles.homeColonne}></div>
        </div>
      </div>
    </div>
  );
}
