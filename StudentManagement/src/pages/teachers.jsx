import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const Teachers = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Teachers</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Teachers</li>
              </ul>
            </div>
            <div className="col-auto text-right float-right ml-auto">
              <Link to={PATH.Teachers.AddTeachers} className="btn btn-primary">
                <i className="fas fa-plus" /> Add Teachers
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0 datatable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Subject</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>T111</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link
                              to={PATH.Teachers.TeacherDetails}
                              className="avatar avatar-sm mr-2"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="/img/avatar.png"
                                alt="User Image"
                              />
                            </Link>
                            <Link to={PATH.Teachers.TeacherDetails}>
                              Huynh Thi
                            </Link>
                          </h2>
                        </td>
                        <td>D</td>
                        <td>Female</td>
                        <td>English</td>
                        <td>0973584587</td>
                        <td>Chau Doc, An Giang</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Teachers.EditTeachers}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>T112</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link
                              to={PATH.Teachers.TeacherDetails}
                              className="avatar avatar-sm mr-2"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="/img/avatar.png"
                                alt="User Image"
                              />
                            </Link>
                            <Link to={PATH.Teachers.TeacherDetails}>
                              Cao Van
                            </Link>
                          </h2>
                        </td>
                        <td>E</td>
                        <td>Male</td>
                        <td>English</td>
                        <td>0242362310</td>
                        <td>Chau Doc, An Giang</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Teachers.EditTeachers}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>T113</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link
                              to={PATH.Teachers.TeacherDetails}
                              className="avatar avatar-sm mr-2"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="/img/avatar.png"
                                alt="User Image"
                              />
                            </Link>
                            <Link to={PATH.Teachers.TeacherDetails}>
                              Pham Thi
                            </Link>
                          </h2>
                        </td>
                        <td>G</td>
                        <td>Female</td>
                        <td>English</td>
                        <td>0267318436</td>
                        <td>Chau Doc, An Giang</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Teachers.EditTeachers}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
