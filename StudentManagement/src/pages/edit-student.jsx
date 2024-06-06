import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../config/path";
import Field from "../Components/Field";
import { Select } from "../Components/Select";
import { ButtonCom } from "../Components/Button";
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
  paidStatus: [required()],
  address: [required()],
};

export const EditStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery({
    queryFn: () => userService.getStudentById(id),
    enabled: !!id,
    onError: () => {
      message.error("This student is not exist!");
      navigate(PATH.Students.index);
    },
  });

  const studentForm = useForm(rules, { initialValue: data.data });

  const { loading: updateLoading, refetch: updateStudentService } =
    useQuery({
      enabled: false,
      queryFn: () => userService.updateStudents(id),
    });

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (studentForm.validate()) {
      updateStudentService(studentForm.values)
        .then((res) => {
          message.success("Student's profile has been updated successfully!");
          navigate(PATH.Students.index);
        })
        .catch(handleError);
    }
  };

  if (loading) return null;

  
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
                          {...studentForm.register("paidStatus")}
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
                      <ButtonCom
                        onClick={onSubmit}
                        loading={updateLoading}
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
