import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { ButtonCom } from "../Components/Button";

export const EditClasses = () => {
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
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Class ID</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="PRE2209"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Class Name</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Mathematics"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Slot</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={5}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <ButtonCom type="submit" className="btn btn-primary">
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
