import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../config/path";
import { ButtonCom } from "../Components/Button";
import { required } from "../utils/validate";
import { useQuery } from "../hooks/useQuery";
import { classService } from "../services/class";
import { useAsync } from "../hooks/useAsync";
import { handleError } from "../utils/handleError";
import { Spin, message } from "antd";
import Field from "../Components/Field";
import { useForm } from "../hooks/useForm";

const rules = {
  code: [required()],
  subject: [required()],
};

export const EditClasses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading: getClassesLoading } = useQuery({
    queryFn: () => classService.getClassById(id),
    enabled: !!id,
  });

  const classForm = useForm(rules, { initialValue: data.data });

  const { loading: updateLoading, excute: updateClass } = useAsync(
    classService.updateClass
  );

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (classForm.validate()) {
      updateClass(classForm.values, id)
        .then((res) => {
          navigate(PATH.Classes.index);
          message.success("Class info has been updated successfully!");
        })
        .catch(handleError);
    }
  };

  if (getClassesLoading) {
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
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Class</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Classes.index}>Classes</Link>
                </li>
                <li className="breadcrumb-item active">Edit Class</li>
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
                        <span>Class Information</span>
                      </h5>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Class Code"
                          placeholder="Class Code"
                          required
                          {...classForm.register("code")}
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Class Name"
                          placeholder="Class Name"
                          required
                          {...classForm.register("subject")}
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Slot"
                          placeholder="Slot"
                          {...classForm.register("slot")}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <ButtonCom
                        onClick={onSubmit}
                        loading={updateLoading}
                        className="btn btn-primary"
                      >
                        Submit
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
