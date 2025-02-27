import styles from "./Auth.module.css";
import RegisterForm from "../../components/AuthForm/Register";

export default function Register() {
  return (
    <div className={styles.authBody}>
      <section>
        <RegisterForm />
      </section>
    </div>
  );
}
