import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATH } from "../config/path";

export const Inbox = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Inbox</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Inbox</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="compose-btn">
              <Link to={PATH.NewMail} className="btn btn-primary btn-block">
                Send New Mail
              </Link>
            </div>
            <ul className="inbox-menu">
              <li>
                <a href="#" className="active">
                  <i className="fas fa-download" /> Inbox{" "}
                  <span className="mail-count">(5)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="far fa-paper-plane" /> Sent Mail
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="far fa-trash-alt" /> Trash
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="email-header">
                  <div className="row">
                    <div className="col top-action-left">
                      <div className="float-left">
                        <div className="btn-group dropdown-action mail-search">
                          <input
                            type="text"
                            placeholder="Search Messages"
                            className="form-control search-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-auto top-action-right">
                      <div className="text-right">
                        <button
                          type="button"
                          title="Refresh"
                          data-toggle="tooltip"
                          className="btn btn-white d-none d-md-inline-block"
                        >
                          <i className="fas fa-sync-alt" />
                        </button>
                        <div className="btn-group">
                          <a className="btn btn-white">
                            <i className="fas fa-angle-left" />
                          </a>
                          <a className="btn btn-white">
                            <i className="fas fa-angle-right" />
                          </a>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-muted d-none d-md-inline-block">
                          Showing 3 of 3{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="email-content">
                  <div className="table-responsive">
                    <table className="table table-inbox table-hover">
                      <thead>
                        <tr>
                          <th colSpan={6}>
                            <input type="checkbox" className="checkbox-all" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="unread clickable-row">
                          <td>
                            <input type="checkbox" className="checkmail" />
                          </td>
                          <td>
                            <span className="mail-important">
                              <i className="fas fa-star starred" />
                            </span>
                          </td>
                          <td className="name">Huynh Thi D</td>
                          <td className="subject">No class tomorrow!</td>
                          <td></td>
                          <td className="mail-date">13:14</td>
                        </tr>
                        <tr className="unread clickable-row">
                          <td>
                            <input type="checkbox" className="checkmail" />
                          </td>
                          <td>
                            <span className="mail-important">
                              <i className="far fa-star" />
                            </span>
                          </td>
                          <td className="name">Huynh Thi D</td>
                          <td className="subject">Homework 4 files.</td>
                          <td>
                            <i className="fas fa-paperclip" />
                          </td>
                          <td className="mail-date">8:42</td>
                        </tr>
                        <tr className="clickable-row">
                          <td>
                            <input type="checkbox" className="checkmail" />
                          </td>
                          <td>
                            <span className="mail-important">
                              <i className="far fa-star" />
                            </span>
                          </td>
                          <td className="name">Huynh Thi D</td>
                          <td className="subject">
                            Tuition payment reminders!
                          </td>
                          <td />
                          <td className="mail-date">30 Nov</td>
                        </tr>
                      </tbody>
                    </table>
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
