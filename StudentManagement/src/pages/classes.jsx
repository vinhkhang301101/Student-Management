import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../config/path';
import { useQuery } from "../hooks/useQuery.js";
import { classService } from "../services/class.js";
import { ClassList } from "../Components/ClassList/index.jsx";
import { useDispatch } from 'react-redux';
import { Empty, Spin } from 'antd';

export const Classes = () => {
  const {data, loading} = useQuery({
    queryFn: () => classService.getClass()
  });

  if (loading) {
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
              <h3 className="page-title">Classes</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Classes</li>
              </ul>
            </div>
            <div className="col-auto text-right float-right ml-auto">
              <Link to={PATH.Classes.AddClasses} className="btn btn-primary">
                <i className="fas fa-plus" /> Add Classes
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {data?.data.length ? (
                    <table className="table table-hover table-center mb-0 datatable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Slot</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.map((e) => (
                          <ClassList key={e._id} {...e} />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Empty
                      description={
                        <h4 className="text-danger fw-bold text-center">
                          There are no classes now!!
                        </h4>
                      }
                    >
                      <Link
                        to={PATH.Classes.AddClasses}
                        className="btn btn-primary mb-2"
                      >
                        Add Class Now
                      </Link>
                    </Empty>
                  )}
                  {/* <table className="table table-hover table-center mb-0 datatable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slot</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((e) => (
                        <ClassList key={e._id} {...e} />
                      ))}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
