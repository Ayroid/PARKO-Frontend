import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const form = [styles.form].join("");
  const input = [styles.input].join("");
  const inputDiv = [styles.inputDiv].join("");
  const button = [styles.button].join("");
  const forgotPassword = [styles.forgotPassword].join("");

  return (
    <form className={form} onSubmit={handleSubmit(onSubmit)}>
      <div className={inputDiv}>
        <input
          className={input}
          {...register("username")}
          id="username"
          type="text"
          placeholder="USERNAME"
        />
      </div>
      <div className={inputDiv}>
        <input
          className={input}
          {...register("otpValue")}
          id="otpValue"
          type="number"
          placeholder="OTP"
        />
      </div>
      <button className={button}>SEND OTP</button>
      <div className={forgotPassword}>Don't have an account? Sign Up</div>
    </form>
  );
};

export default LoginForm;
