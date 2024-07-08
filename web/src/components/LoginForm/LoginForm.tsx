import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { login } from "../../services/auth";
import { getMessage } from "../../services/ai";
import { LoginFormProps } from "../../types";

export default function LoginForm() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    console.log(data);
    try {
      const res = await login(data);
      if (res) {
        const message = await getMessage();
        alert(message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${styles.inputContainer} ${
            isEmailFocused ? styles.inputFocused : ""
          }`}
        >
          <img
            src="/src/assets/EmailIcon.png"
            alt="Email Icon"
            className={styles.icon}
          />
          <input
            {...register("email", { required: true })}
            className={styles.input}
            type="email"
            placeholder="Email"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </div>

        <div
          className={`${styles.inputContainer} ${
            isPasswordFocused ? styles.inputFocused : ""
          }`}
        >
          <img
            src="/src/assets/LockIcon.png"
            alt="Lock Icon"
            className={styles.icon}
          />
          <input
            {...register("password", { required: true })}
            className={styles.input}
            type="password"
            placeholder="Password"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <img
            src="/src/assets/EyeIcon.png"
            alt="Eye Icon"
            className={styles.icon}
          />
        </div>

        <button type="button" className={styles.forgotPassword}>
          Forgot password?
        </button>
        <button type="submit" className={styles.loginButton}>
          Log in
        </button>
      </form>

      <div className={styles.divider}>
        <div className={styles.line} />
        <span className={styles.or}>Or</span>
        <div className={styles.line} />
      </div>

      <div className={styles.socialLoginContainer}>
        <button className={styles.socialButton}>
          <img
            src="/src/assets/Google.png"
            alt="Google"
            className={styles.socialLogo}
          />
          <span className={styles.socialText}>Google</span>
        </button>
        <button className={styles.socialButton}>
          <img
            src="/src/assets/Facebook.png"
            alt="Facebook"
            className={styles.socialLogo}
          />
          <span className={styles.socialText}>Facebook</span>
        </button>
      </div>

      <div>
        <p className={styles.register}>Don't have an account yet?</p>
      </div>

      <button className={styles.registerButton}>Register</button>
    </div>
  );
}
