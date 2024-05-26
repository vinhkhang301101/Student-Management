import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import Field from "../Components/Field";
import { Button } from "../Components/Button";
import { useAuthRedux } from "../hooks/useAuthRedux";
import { useForm } from "../hooks/useForm";
import { required } from "../utils/validate";
import { useQuery } from "../hooks/useQuery";
import { userService } from "../services/user";
import { handleError } from "../utils/handleError";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUserAction } from "../store/auth";

const rules = {
  fullname: [required()],
}

export const EditProfile = () => {
  const { user } = useAuthRedux();
  const dispatch = useDispatch();
  const userForm = useForm(rules, { initialValue: user.data[0] });

  const { loading, refetch: updateProfileService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateProfile(...params),
  });

  const onSubmit = async (ev) => {
    ev.preventDefault()
    try {
      if (userForm.validate()) {
        const res = await updateProfileService(userForm.values);
        dispatch(setUserAction(res.data))
        message.success("Your profile has been updated successfully!")
      }
    } catch (err) {
      handleError(err)
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
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Full Name"
                          placeholder="Full Name"
                          {...userForm.register("fullname")}
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Date of Birth"
                          placeholder="Date of Birth"
                          {...userForm.register("date")}
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Email"
                          placeholder="Email"
                          {...userForm.register("email")}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Phone Number"
                          placeholder="Phone Number"
                          {...userForm.register("phone")}
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Address"
                          renderInput={(props) => (
                            <textarea  placeholder="Address" className="form-control" />
                          )}
                          {...userForm.register("address")}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <Button onClick={onSubmit} className="btn btn-primary">Save Changes</Button>
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
