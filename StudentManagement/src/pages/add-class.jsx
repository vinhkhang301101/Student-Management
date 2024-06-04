import React from 'react'
import { Link } from 'react-router-dom';
import { PATH } from '../config/path';
import { useForm } from '../hooks/useForm';
import { required } from '../utils/validate';
import Field from '../Components/Field';
import { ButtonCom } from "../Components/Button";
import { useDispatch } from "react-redux";
import { addClassAction } from '../store/class';
import { message } from 'antd';
import { handleError } from '../utils/handleError';
import { useQuery } from '../hooks/useQuery';

export const AddClasses = () => {
  const dispatch = useDispatch()
  const { loading } = useQuery({
    enabled: false,
    limitDuration: 1000,
  });
 
  const classForm = useForm({
    code: [required()],
    subject: [required()],
    slot: [required()],
  });

  const onAddClass = (ev) => {
    ev.preventDefault()
    try {
      if (classForm.validate()) {
        dispatch(addClassAction(classForm.values));
        classForm.reset()
        message.success("Added class successfully!")
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
              <h3 className="page-title">Add Class</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Classes.index}>Classes</Link>
                </li>
                <li className="breadcrumb-item active">Add Class</li>
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
                          label="Class ID"
                          placeholder="Class ID"
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
                          required
                          {...classForm.register("slot")}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <ButtonCom loading={loading} onClick={onAddClass} className="btn btn-primary">
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
}
