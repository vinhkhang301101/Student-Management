import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../config/path';
import Field from '../Components/Field';
import { regexp, required } from '../utils/validate';
import { useForm } from '../hooks/useForm';
import { useQuery } from '../hooks/useQuery';
import { userService } from '../services/user';
import { handleError } from '../utils/handleError';
import { ButtonCom } from "../Components/Button";
import { message } from 'antd';

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const forgetPassForm = useForm({
    email: [required(), regexp("email")],
  });

  const { loading, refetch: sendCodeService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.sendEmail(...params),
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (forgetPassForm.validate()) {
      sendCodeService(forgetPassForm.values)
        .then((res) => {
          message.success("Please check your email for recover code!");
          navigate(PATH.RecoverPassword);
        })
        .catch(handleError);
    }
  }

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
                  <h1>Forgot Password?</h1>
                  <p className="account-subtitle">
                    Enter your email to get a password recover code
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
                    <div className="form-group mb-0">
                      <ButtonCom
                        onClick={onSubmit}
                        loading={loading}
                        className="btn btn-primary btn-block"
                      >
                        Send Recover Code
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
}
