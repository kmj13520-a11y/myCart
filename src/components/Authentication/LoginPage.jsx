import { useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { login } from "../../services/userServices";

export default function LoginPage() {
  //useSate 대신에 useForm 사용
  const [formError, setFormError] = useState(""); //로그인 에러
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = async (formData) => {
    try {
      await login(formData);
      window.location = "/";
    } catch (err) {
      setFormError(err.response.data.message);
    }
  };

  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: "이메일은 필수 입력입니다." })}
              type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "패스워드는 필수 입력입니다.",
                minLength: {
                  value: 4,
                  message: "패스워드는 최소 4자 이상입니다.",
                },
              })}
              type="password"
              id="password"
              className="form_text_input"
              placeholder="패스워드"
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
