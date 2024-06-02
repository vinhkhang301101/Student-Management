import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../config/path";
import Field from "../Components/Field";
import { Select } from "../Components/Select";
import { Button } from "../Components/Button";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { useAuthRedux } from "../hooks/useAuthRedux";
import { useQuery } from "../hooks/useQuery";
import { userService } from "../services/user";
import { handleError } from "../utils/handleError";
import { message } from "antd";
import { regexp, required } from "../utils/validate";

const rules = {
  firstname: [required()],
  lastname: [required()],
  studentID: [required()],
  gender: [required()],
  date: [required()],
  classcode: [required()],
  phone: [required(), regexp("phone")],
  status: [required()],
  address: [required()],
};

export const EditStudents = () => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentForm = useForm(rules, { initialValue: user });

  const { loading, refetch: updateStudentService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateStudents(...params),
  });

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (
      object.isEqual(
        user,
        studentForm.values,
        "firstname",
        "lastname",
        "studentID",
        "gender",
        "date",
        "classcode",
        "phone",
        "status",
        "address"
      )
    ) {
      message.warning("Enter the information to change your profile!");
    }

    if (studentForm.validate()) {
      updateStudentService(studentForm.values)
        .then((res) => {
          dispatch(setUserAction(res.data));
          navigate(PATH.Students);
          message.success("This profile has been updated successfully!");
        })
        .catch(handleError);
    }
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Students</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Students.index}>Students</Link>
                </li>
                <li className="breadcrumb-item active">Edit Students</li>
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
                        <span>Student Information</span>
                      </h5>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <Field
                          label="First Name"
                          placeholder="First Name"
                          required
                          {...studentForm.register("firstname")}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <Field
                          label="Last Name"
                          placeholder="Last Name"
                          required
                          {...studentForm.register("lastname")}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Student Id"
                          placeholder="Student Id"
                          required
                          {...studentForm.register("studentID")}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Gender"
                          placeholder="Gender"
                          required
                          {...studentForm.register("gender")}
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
                          {...studentForm.register("date")}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Class"
                          placeholder="Class"
                          required
                          {...studentForm.register("classcode")}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Email"
                          placeholder="Email"
                          required
                          {...studentForm.register("email")}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Phone Number"
                          placeholder="Phone Number"
                          required
                          {...studentForm.register("phone")}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Status"
                          placeholder="Status"
                          required
                          {...studentForm.register("status")}
                          renderInput={(props) => (
                            <Select
                              {...props}
                              // error={registerForm.error}
                              placeholder={"Status"}
                              option={[
                                { value: "Paid", label: "Paid" },
                                { value: "Unpaid", label: "Unpaid" },
                              ]}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="form-group">
                        <Field
                          label="Address"
                          placeholder="Address"
                          required
                          {...studentForm.register("address")}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <Button onClick={onSubmit} className="btn btn-primary">
                        Save Changes
                      </Button>
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
