import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const AddStudents = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Add Students</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Students.index}>Students</Link>
                </li>
                <li className="breadcrumb-item active">Add Students</li>
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
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Student Id</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control">
                          <option>Select Gender</option>
                          <option>Female</option>
                          <option>Male</option>
                          <option>Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <div>
                          <input type="date" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Class</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Status</label>
                        <select className="form-control">
                          <option>Paid</option>
                          <option>Unpaid</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Present Address</label>
                        <textarea className="form-control" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
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
