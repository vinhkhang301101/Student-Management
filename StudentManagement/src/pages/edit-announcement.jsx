import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const EditAnnouncements = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Announcement</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Announcement.index}>Announcements</Link>
                </li>
                <li className="breadcrumb-item active">Edit Announcement</li>
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
                        <span>Announcement Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <label>Announcement Title</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Homework 4 Submission"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <label>Due Date</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Sep 06, 11:59 pm"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          defaultValue="Submit the homework here.
                          Due date: Sep 03, 11:59 pm
                          IMPORTANT: Submit file in .pdf"
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
