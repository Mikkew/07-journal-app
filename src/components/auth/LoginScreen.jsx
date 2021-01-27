import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../redux/actions/auth";

export const LoginScreen = () => {
  const [{ email, password }, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input mt-5"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mt-5" disabled={loading}>
          Login
        </button>
        <div className="auth__social-networks">
          <p>{"Login with Social Networks"}</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create New Account
        </Link>
      </form>
    </>
  );
};
