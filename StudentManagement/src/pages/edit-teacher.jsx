import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const EditTeachers = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Teachers</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Teachers.index}>Teachers</Link>
                </li>
                <li className="breadcrumb-item active">Edit Teachers</li>
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
                        <span>Basic Details</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Huynh Thi"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Teacher ID</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="T111"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control">
                          <option>Female</option>
                          <option>Male</option>
                          <option>Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="0973584587"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="English"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="23 Jun 1985"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Present Address</label>
                        <textarea
                          className="form-control"
                          defaultValue={"Chau Doc, An Giang"}
                        />
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
