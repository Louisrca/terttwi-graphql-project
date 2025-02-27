<<<<<<< HEAD
import styles from "./Auth.module.css";
import LoginForm from "../../components/AuthForm/LoginForm";

export default function Login() {
  return (
    <div className={styles.authBody}>
      <section>
        <LoginForm />
      </section>
=======
import {useState} from "react";
import styles from "./Auth.module.css";
import HeartIcon from "../../common/svg/HeartIcon";

import AuthForm from "../../components/AuthForm/AuthForm";
export default function Login() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles.authBody}>
      <section>
        <AuthForm type="login" />
      </section>

      <HeartIcon handleIsLiked={() => setIsLiked(!isLiked)} isActive={isLiked} />
>>>>>>> c65cf40 (add: auth page)
    </div>
  );
}
