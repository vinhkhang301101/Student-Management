import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const NewMail = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">New Mail</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Inbox}>Inbox</Link>
                </li>
                <li className="breadcrumb-item active">New Mail</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-8">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="To"
                      className="form-control"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="Cc"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="Bcc"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      rows={4}
                      className="form-control summernote"
                      placeholder="Enter your message here"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <div className="text-center">
                      <Link to={PATH.Inbox} className="btn btn-primary">
                        <i className="fas fa-paper-plane m-r-5" />{" "}
                        <span>Send</span>
                      </Link>
                      <button className="btn btn-danger m-l-5" type="button">
                        {" "}
                        <i className="far fa-trash-alt m-r-5" />
                        <span>Delete</span>
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
