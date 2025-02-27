import { useState } from "react";
import styles from "./Auth.module.css";
import HeartIcon from "../../common/svg/HeartIcon1";

import AuthForm from "../../components/AuthForm/AuthForm";
export default function Login() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles.authBody}>
      <section>
        <AuthForm type="login" />
      </section>

      <HeartIcon
        handleIsLiked={() => setIsLiked(!isLiked)}
        isActive={isLiked}
      />
    </div>
  );
}
