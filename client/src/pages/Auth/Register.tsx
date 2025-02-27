<<<<<<< HEAD
import styles from "./Auth.module.css";
import RegisterForm from "../../components/AuthForm/Register";
=======
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./Auth.module.css";
>>>>>>> c65cf40 (add: auth page)

export default function Register() {
  return (
    <div className={styles.authBody}>
      <section>
<<<<<<< HEAD
        <RegisterForm />
=======
        <AuthForm type="Register" />
>>>>>>> c65cf40 (add: auth page)
      </section>
    </div>
  );
}
