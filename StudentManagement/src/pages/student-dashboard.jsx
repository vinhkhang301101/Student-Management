import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";

export const StudentDashboard = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome A!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Student Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 col-xl-12">
            <div className="card flex-fill">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h5 className="card-title">Annoucements</h5>
                  </div>
                  <div className="col-6">
                    <span className="float-right view-link">
                      <Link to={PATH.Announcement.index}>
                        View All Annoucements
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="teaching-card">
                  <ul className="activity-feed">
                    <li className="feed-item">
                      <div className="feed-date1">Sep 05, 9:00 am</div>
                      <span className="feed-text1">
                        <a>Homework 4 Submission (Due day: Sep 06, 11:59 pm)</a>
                      </span>
                      <p>
                        <span>In Progress</span>
                      </p>
                    </li>
                    <li className="feed-item">
                      <div className="feed-date1">Sep 04, 2:00 pm</div>
                      <span className="feed-text1">
                        <a className="text-danger">
                          Make-up class in Sep 10, 4:00 pm
                        </a>
                      </span>
                    </li>
                    <li className="feed-item">
                      <div className="feed-date1">Sep 02, 1:00 pm</div>
                      <span className="feed-text1">
                        <a>Homework 3 Submission (Due day: Sep 03, 11:59 pm)</a>
                      </span>
                      <p>
                        <span>In Progress</span>
                      </p>
                    </li>
                    <li className="feed-item">
                      <div className="feed-date1">Aug 30, 10:00 am</div>
                      <span className="feed-text1">
                        <a className="text-danger">Class 3 is postponed!</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card flex-fill">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-12">
                    <h5 className="card-title">Calendar</h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div id="calendar-doctor" className="calendar-container" />
                <div className="calendar-info calendar-info1">
                  <div className="calendar-details">
                    <p>Thursday</p>
                    <h6 className="calendar-blue d-flex justify-content-between align-items-center">
                      Class 1 <span>9:00am - 10:00am</span>
                    </h6>
                  </div>
                  <div className="calendar-details">
                    <p>Thursday</p>
                    <h6 className="calendar-violet d-flex justify-content-between align-items-center">
                      Class 2 <span>10:00am - 11:00am</span>
                    </h6>
                  </div>
                  <div className="calendar-details">
                    <p>Thursday</p>
                    <h6 className="calendar-red d-flex justify-content-between align-items-center">
                      Break <span>11:00am - 11:30am</span>
                    </h6>
                  </div>
                  <div className="calendar-details">
                    <p>Thursday</p>
                    <h6 className="calendar-orange d-flex justify-content-between align-items-center">
                      Class 3 <span>11:30am - 12:00pm</span>
                    </h6>
                  </div>
                  <div className="calendar-details">
                    <p>Thursday</p>
                    <h6 className="calendar-blue d-flex justify-content-between align-items-center">
                      Class 4 <span>1:00pm - 2:00pm</span>
                    </h6>
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
