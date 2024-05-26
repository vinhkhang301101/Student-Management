import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const StudentDetails = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Students Details</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Students.index}>Students</Link>
                </li>
                <li className="breadcrumb-item active">Students Details</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="about-info">
                  <h4>About Me</h4>
                  <div className="media mt-3">
                    <img src="/img/user.jpg" className="mr-3" alt="..." />
                    <div className="media-body">
                      <ul>
                        <li>
                          <span className="title-span">Full Name: </span>
                          <span className="info-span">Nguyen Van A</span>
                        </li>
                        <li>
                          <span className="title-span">Mobile : </span>
                          <span className="info-span">0973584587</span>
                        </li>
                        <li>
                          <span className="title-span">Email : </span>
                          <span className="info-span">student1@gmail.com</span>
                        </li>
                        <li>
                          <span className="title-span">Gender : </span>
                          <span className="info-span">Male</span>
                        </li>
                        <li>
                          <span className="title-span">DOB : </span>
                          <span className="info-span">2 Feb 2009</span>
                        </li>
                      </ul>
                    </div>
                    <Link
                      to={PATH.Students.EditStudents}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-pen mr-2" />
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <div className="skill-info">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <h5>Education</h5>
                      <p className="mt-3">
                        Secondary Schooling at xyz school of secondary
                        education.
                      </p>
                      <p>
                        Higher Secondary Schooling at xyz school of higher
                        secondary education.
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <h5>Certificates</h5>
                      <p className="mt-3">1st Prize in Running Competition.</p>
                      <p>
                        Won overall star student in higher secondary education.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
