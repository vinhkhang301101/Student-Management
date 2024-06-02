import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { StudentList } from "../Components/StudentsList";
import { userService } from "../services/user";
import { useAuthRedux } from "../hooks/useAuthRedux";

export const Students = () => {
  const { user } = useAuthRedux()
  const { data, loading } = useQuery({
    queryFn: () => userService.getAllStudents(),
  });

  if (loading) return null;

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Students</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Students</li>
              </ul>
            </div>
            <div className="col-auto text-right float-right ml-auto">
              <Link to={PATH.Students.AddStudents} className="btn btn-primary">
                <i className="fas fa-plus" /> Add Students
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {/* {user?.data.length ? (
                    <table className="table table-hover table-center mb-0 datatable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Class</th>
                          <th>Gender</th>
                          <th>DOB</th>
                          <th>Phone Number</th>
                          <th>Address</th>
                          <th className="text-right">Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.data.map((e) => (
                          <StudentList key={e._id} {...e} />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h5 className="text-danger fw-bold text-center">
                      There are no students now, update soon!!
                    </h5>
                  )} */}
                  <table className="table table-hover table-center mb-0 datatable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th className="text-right">Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((e) => (
                        <StudentList key={e._id} {...e} />
                      ))}
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
