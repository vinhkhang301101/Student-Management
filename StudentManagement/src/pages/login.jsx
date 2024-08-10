import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { minMax, regexp, required, validate } from "../utils/validate";
import Field from "../components/Field";
import { useAuth } from "../components/AuthContext";
import { ButtonCom } from "../components/Button";
import { handleError } from "../utils/handleError";
import { useDispatch } from "react-redux";
import { loginAction } from "../stores/auth";
import { message } from "antd";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const { loginLoading } = useAuth();
  const dispatch = useDispatch();

  const loginForm = useForm({
    email: [required(), regexp("email")],
    password: [required(), minMax(6)],
  });

  const onLogin = async (ev) => {
    ev.preventDefault();
    try {
      if (loginForm.validate()) {
        await dispatch(loginAction(loginForm.values)).unwrap();
        message.success("Login successfully!");
      }
    } catch (err) {
      // handleError(err);
    }
  }

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src="/whiteLogo.svg" alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">
                    Welcome to the Student Management system!
                  </p>
                  <form action="">
                    <div className="form-group">
                      <Field
                        label="Email"
                        placeholder="Email"
                        required
                        {...loginForm.register("email")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Password"
                        placeholder="Password"
                        type="password"
                        required
                        {...loginForm.register("password")}
                      />
                    </div>
                    <div className="form-group">
                      <ButtonCom loading={loginLoading} onClick={onLogin}>
                        Login
                      </ButtonCom>
                    </div>
                  </form>
                  <div className="text-center forgotpass">
                    <Link to={PATH.ForgotPassword}>Forget Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  <div className="social-login">
                    <span>Login with</span>
                    <a href="https://www.facebook.com/" className="facebook">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://www.google.com.vn/" className="google">
                      <i className="fab fa-google" />
                    </a>
                  </div>
                  <div className="text-center dont-have">
                    Don’t have an account?{" "}
                    <Link to={PATH.Register}>Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
