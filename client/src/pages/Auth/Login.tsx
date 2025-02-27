import styles from "./Auth.module.css";
import LoginForm from "../../components/AuthForm/LoginForm";

export default function Login() {
  return (
    <div className={styles.authBody}>
      <section>
        <LoginForm />
      </section>
    </div>
  );
}
