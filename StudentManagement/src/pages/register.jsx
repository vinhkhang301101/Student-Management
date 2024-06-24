import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { PATH } from "../config/path";
import Field from "../Components/Field";
import { userService } from "../services/user";
import { confirm, minMax, regexp, required } from "../utils/validate";
import { ButtonCom } from "../Components/Button";
import { useQuery } from "../hooks/useQuery";
import { handleError } from "../utils/handleError"
import { Select } from "../Components/Select";
import { useForm } from "../hooks/useForm";
import { useAsync } from "../hooks/useAsync";

export const Register = () => {
  const navigate = useNavigate();
  const { loading, refetch: registerService } = useQuery({
    enabled: false,
    queryFn: () => userService.register(registerForm.values),
    limitDuration: 1000,
  });

  // const { loading, excute: registerService } = useAsync(userService.register);

  const registerForm = useForm({
    fullname: [required()],
    userID: [required()],
    email: [required(), regexp("email")],
    role: [required()],
    password: [required(), minMax(6)],
    confirmed: [required(), confirm("password")],
  });

  const onRegister = async (ev) => {
    ev.preventDefault();
    if (registerForm.validate()) {
      try {
        const res = await registerService(registerForm.values);
        if (res) {
          registerForm.reset();
          message.success("Register successfully!");
          navigate(PATH.Login);
        }
      } catch (err) {
        handleError(err);
      }
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
                  <h1>Register</h1>
                  <p className="account-subtitle">
                    Welcome to the Student Management system!
                  </p>
                  <form action="">
                    <div className="form-group">
                      <Field
                        label="Fullname"
                        placeholder="Fullname"
                        required
                        {...registerForm.register("fullname")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="User ID"
                        placeholder="User ID"
                        required
                        {...registerForm.register("userID")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Email"
                        placeholder="Email"
                        required
                        {...registerForm.register("email")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Password"
                        placeholder="Password"
                        type="password"
                        required
                        {...registerForm.register("password")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        required
                        {...registerForm.register("confirmed")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Login as"
                        placeholder="Login as"
                        required
                        {...registerForm.register("role")}
                        // renderInput={(props) => (
                        //   <Select
                        //     {...props}
                        //     // error={registerForm.error}
                        //     placeholder={"Login as"}
                        //     option={[
                        //       { value: "Teacher", label: "Teacher" },
                        //       {
                        //         value: "Student",
                        //         label: "Student",
                        //       },
                        //     ]}
                        //   />
                        // )}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <ButtonCom onClick={onRegister} loading={loading}>
                        Register
                      </ButtonCom>
                    </div>
                  </form>
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  <div className="social-login">
                    <span>Register with</span>
                    <a href="https://www.facebook.com/" className="facebook">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://www.google.com.vn/" className="google">
                      <i className="fab fa-google" />
                    </a>
                  </div>
                  <div className="text-center dont-have">
                    Already have an account? <Link to={PATH.Login}>Login</Link>
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
