import IllustrationContainer from "../../components/IllustrationContainer";
import LoginForm from "../../components/LoginForm";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <IllustrationContainer />
      <LoginForm />
    </div>
  );
}
