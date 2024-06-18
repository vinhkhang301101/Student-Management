import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement.js";
import { classService } from "../services/class.js";
import { AnnouncementFeed } from "../Components/AnnouncementFeed";
import { Calendar, Empty, Spin } from "antd";
import { UpcomingClass } from "../Components/UpcomingClass/index.jsx";


export const TeacherDashboard = () => {
  const { data: announcement, loading: announcementLoading } = useQuery({
    queryFn: () => announcementService.getAnnouncement(),
  });

  const { data: classes, loading: classLoading } = useQuery({
    queryFn: () => classService.getClass(),
  });

  if (announcementLoading && classLoading) {
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
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome D!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="">Home</Link>
                </li>
                <li className="breadcrumb-item active">Teacher Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 col-xl-6">
            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12 d-flex">
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
                      {announcement?.data.length ? (
                        <ul className="activity-feed">
                          {announcement.data.map((e) => (
                            <AnnouncementFeed key={e._id} {...e} />
                          ))}
                        </ul>
                      ) : (
                        <Empty
                          description={
                            <h4 className="text-danger fw-bold text-center">
                              There are no announcements now!!
                            </h4>
                          }
                        >
                          <Link
                            to={PATH.Announcement.AddAnnouncements}
                            className="btn btn-primary mb-2"
                          >
                            Add Announcement Now
                          </Link>
                        </Empty>
                      )}
                      {/* <ul className="activity-feed">
                        {data.data.map((e) => (
                          <AnnouncementFeed key={e._id} {...e} />
                        ))}
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h5 className="card-title">Upcoming Classes</h5>
                      </div>
                      <div className="col-6">
                        <span className="float-right view-link">
                          <Link to={PATH.Classes.index}>View All Classes</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-3">
                    <div className="table-responsive class-list">
                      <table className="table table-center">
                        <tbody>
                          {classes?.data.length ? (
                            <ul className="activity-feed">
                              {classes.data.map((e) => (
                                <UpcomingClass key={e._id} {...e} />
                              ))}
                            </ul>
                          ) : (
                            <Empty
                              description={
                                <h4 className="text-danger fw-bold text-center">
                                  There are no classes now!!
                                </h4>
                              }
                            >
                              <Link
                                to={PATH.Announcement.AddAnnouncements}
                                className="btn btn-primary mb-2"
                              >
                                Add Class Now
                              </Link>
                            </Empty>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-12 col-xl-6">
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
                  <Calendar className="w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
