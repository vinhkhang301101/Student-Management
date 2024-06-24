import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useAuthRedux } from "../hooks/useAuthRedux";
import { useForm } from "../hooks/useForm";
import { confirm, minMax, required, validate } from "../utils/validate";
import Field from "../Components/Field";
import { ButtonCom } from "../Components/Button";
import { userService } from "../services/user";
import { useQuery } from "../hooks/useQuery";
import { message } from "antd";
import { setUserAction } from "../stores/auth";
import { handleError } from "../utils/handleError";
import { useDispatch } from "react-redux";
// import { getUser } from "../utils/token";

const rules = {
  oldPassword: [
    (_, forms) => {
      if (forms.newPassword) {
        const errorObj = validate(
          {
            oldPassword: [required(), minMax(6)],
          },
          forms
        );
        return errorObj.oldPassword;
      }
    },
  ],
  newPassword: [
    (value, forms) => {
      if (forms.oldPassword) {
        if (forms.oldPassword === value) {
          return "Please do not enter the same as old password!"
        }
        const errorObj = validate(
          {
            newPassword: [required(), minMax(6)],
          },
          forms
        );
        return errorObj.newPassword;
      }
    },
  ],
  confirmPassword: [confirm("newPassword")],
};

export const Profile = () => {
  const { user } = useAuthRedux();
  const changePassForm = useForm(rules)

  const { loading, refetch: changePasswordService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.changePassword(...params),
  });

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (changePassForm.validate()) {
      if (changePassForm.values.newPassword) {
        changePasswordService({
          oldPassword: changePassForm.values.oldPassword,
          newPassword: changePassForm.values.newPassword,
        })
          .then((res) => {
            message.success("Changed password successfully!");
            changePassForm.reset();
          })
          .catch(handleError);
      }
    } 
  }

  if (loading) {
    return (
      <div className="content container-fluid">
        <Spin fullscreen size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <a href="#">
                    <img
                      className="rounded-circle"
                      alt="User Image"
                      src="img/user.jpg"
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">
                    {user.fullname} - {user.userID}
                  </h4>
                  <div className="user-Location">
                    <i className="fas fa-map-marker-alt" /> {user.address}
                  </div>
                  <div className="about-text">{user.role}</div>
                </div>
                <div className="col-auto profile-btn">
                  <Link
                    to={PATH.Profile.EditProfile}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-pen mr-2" />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Personal Details</span>
                        <Link
                          className="edit-link"
                          data-toggle="modal"
                          to={PATH.Profile.EditProfile}
                        >
                          <i className="far fa-edit mr-1" />
                          Edit
                        </Link>
                      </h5>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Full Name
                        </p>
                        <p className="col-sm-9">{user.fullname}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Email
                        </p>
                        <p className="col-sm-9">{user.email}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Teacher ID
                        </p>
                        <p className="col-sm-9">{user.userID}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Date of Birth
                        </p>
                        <p className="col-sm-9">{user.date}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Email Address
                        </p>
                        <p className="col-sm-9">{user.email}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Phone Number
                        </p>
                        <p className="col-sm-9">{user.phone}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0">
                          Address
                        </p>
                        <p className="col-sm-9 mb-0">{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <div className="row">
                    <div className="col-md-10">
                      <form>
                        <div className="form-group">
                          <Field
                            label="Old Password"
                            placeholder="Old Password"
                            type="password"
                            required
                            {...changePassForm.register("oldPassword")}
                            autoComplete="new-password"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            label="New Password"
                            placeholder="New Password"
                            type="password"
                            required
                            {...changePassForm.register("newPassword")}
                            autoComplete="new-password"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                            required
                            {...changePassForm.register("confirmPassword")}
                            autoComplete="new-password"
                          />
                        </div>
                        <ButtonCom
                          loading={loading}
                          onClick={onSubmit}
                          className="btn btn-primary"
                        >
                          Save Changes
                        </ButtonCom>
                      </form>
                    </div>
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
