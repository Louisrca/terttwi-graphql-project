import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./Auth.module.css";

export default function Register() {
  return (
    <div className={styles.authBody}>
      <section>
        <AuthForm type="Register" />
      </section>
    </div>
  );
}
