import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../config/path";
import Field from "../components/Field";
import { ButtonCom } from "../components/Button";
import { useAuthRedux } from "../hooks/useAuthRedux";
import { useForm } from "../hooks/useForm";
import { regexp, required } from "../utils/validate";
import { useQuery } from "../hooks/useQuery";
import { userService } from "../services/user";
import { handleError } from "../utils/handleError";
import { object } from "../utils/object";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUserAction } from "../stores/auth";
import { Select } from "../components/Select";
import _, { first } from "lodash";

const rules = {
  fullname: [required()],
  userID: [required()],
};

export const EditProfile = () => {
  const { user } = useAuthRedux();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userForm = useForm(rules, { initialValue: user });

  const { loading, refetch: updateProfileService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateProfile(...params),
  });

  const onSubmit = async (ev) => {
    ev.preventDefault()
    
    if (
      object.isEqual(
        user,
        userForm.values,
        "fullname",
        "gender",
        "date",
        "phone",
        "address"
      )
    ) {
      message.warning("Enter the information to change your profile!");
    }

    if (userForm.validate()) {
      updateProfileService(userForm.values)
        .then((res) => {
          dispatch(setUserAction(res.data));
          navigate(PATH.Profile.index);
          message.success("Your profile has been updated successfully!");
        })
        .catch(handleError);
    }
  }

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Profile.index}>Profile</Link>
                </li>
                <li className="breadcrumb-item active">Edit Profile</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Personal Details</span>
                      </h5>
                    </div>
                    {user?.role == "Teacher" ? (
                      <>
                        <div className="col-6">
                          <div className="form-group">
                            <Field
                              label="Full Name"
                              placeholder="Full Name"
                              required
                              {...userForm.register("fullname")}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <Field
                              label="Email"
                              placeholder="Email"
                              {...userForm.register("email")}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Teacher ID"
                              placeholder="Teacher ID"
                              required
                              {...userForm.register("userID")}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Gender"
                              placeholder="Gender"
                              required
                              {...userForm.register("gender")}
                              // renderInput={(props) => (
                              //   <Select
                              //     {...props}
                              //     // error={registerForm.error}
                              //     placeholder={"Gender"}
                              //     option={[
                              //       { value: "Male", label: "Male" },
                              //       { value: "Female", label: "Female" },
                              //       { value: "Other", label: "Other" },
                              //     ]}
                              //   />
                              // )}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Date of Birth"
                              placeholder="Date of Birth"
                              required
                              {...userForm.register("date")}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Phone Number"
                              placeholder="Phone Number"
                              required
                              {...userForm.register("phone")}
                            />
                          </div>
                        </div>
                        <div className="col-9 mt-3">
                          <div className="form-group">
                            <Field
                              label="Address"
                              placeholder="Address"
                              required
                              {...userForm.register("address")}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-6">
                          <div className="form-group">
                            <Field
                              label="Full Name"
                              placeholder="Full Name"
                              required
                              {...userForm.register("fullname")}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <Field
                              label="Email"
                              placeholder="Email"
                              required
                              {...userForm.register("email")}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Student ID"
                              placeholder="Student ID"
                              required
                              {...userForm.register("userID")}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Gender"
                              placeholder="Gender"
                              required
                              {...userForm.register("gender")}
                              renderInput={(props) => (
                                <Select
                                  {...props}
                                  // error={registerForm.error}
                                  placeholder={"Gender"}
                                  option={[
                                    { value: "Male", label: "Male" },
                                    { value: "Female", label: "Female" },
                                    { value: "Other", label: "Other" },
                                  ]}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Date of Birth"
                              placeholder="Date of Birth"
                              required
                              {...userForm.register("date")}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Class"
                              placeholder="Class"
                              required
                              {...userForm.register("classcode")}
                            />
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="form-group">
                            <Field
                              label="Phone Number"
                              placeholder="Phone Number"
                              required
                              {...userForm.register("phone")}
                            />
                          </div>
                        </div>
                        <div className="col-9 mt-3">
                          <div className="form-group">
                            <Field
                              label="Address"
                              placeholder="Address"
                              required
                              {...userForm.register("address")}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-12">
                      <ButtonCom
                        onClick={onSubmit}
                        loading={loading}
                        className="btn btn-primary"
                      >
                        Save Changes
                      </ButtonCom>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
