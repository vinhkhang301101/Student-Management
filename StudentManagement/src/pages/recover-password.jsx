import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../config/path";
import { ButtonCom } from "../components/Button";
import Field from "../components/Field";
import { useForm } from "../hooks/useForm";
import { confirm, regexp, required } from "../utils/validate";
import { useQuery } from "../hooks/useQuery";
import { userService } from "../services/user";
import { handleError } from "../utils/handleError";
import { message } from "antd";

const rules = {
  email: [required(), regexp("email")],
  recoverCode: [required()],
  newPassword: [required()],
  confirmPassword: [required(),confirm("newPassword")],
};

export const RecoverPassword = () => {
  const navigate = useNavigate();
  const forgetPassForm = useForm(rules)

  const { loading, refetch: forgotPasswordService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.forgotPassword(...params),
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (forgetPassForm.validate()) {
      forgotPasswordService(forgetPassForm.values)
        .then((res) => {
          forgetPassForm.reset()
          message.success("Reset password successfully!");
          navigate(PATH.Login);
        })
        .catch(handleError);
    }
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src="img/whiteLogo.png" alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Recover Your Password</h1>
                  <p className="account-subtitle">
                    Please check your email to get a password recover code
                  </p>
                  <form>
                    <div className="form-group">
                      <Field
                        label="Email"
                        placeholder="Email"
                        required
                        {...forgetPassForm.register("email")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Recover Code"
                        placeholder="Recover Code"
                        required
                        {...forgetPassForm.register("recoverCode")}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="New Password"
                        placeholder="New Password"
                        type="password"
                        required
                        {...forgetPassForm.register("newPassword")}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        required
                        {...forgetPassForm.register("confirmPassword")}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <ButtonCom loading={loading} onClick={onSubmit} className="btn btn-primary btn-block">
                        Reset Password
                      </ButtonCom>
                    </div>
                  </form>
                  <div className="text-center dont-have">
                    Remember your password? <Link to={PATH.Login}>Login</Link>
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
