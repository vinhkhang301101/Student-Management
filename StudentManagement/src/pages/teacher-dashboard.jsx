import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement.js";
import { AnnouncementFeed } from "../Components/AnnouncementFeed";

export const TeacherDashboard = () => {
  const { data, loading } = useQuery({
    queryFn: () => announcementService.getAnnouncement(),
  });

  if (loading) return null;

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
              <div className="col-12 col-lg-6 col-xl-12 d-flex">
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
                        {
                          data.data.data.map(e => <AnnouncementFeed key={e._id} {...e} />)
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-12 d-flex">
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
                    <div className="table-responsive lesson">
                      <table className="table table-center">
                        <tbody>
                          <tr>
                            <td>
                              <div className="date">
                                <b>Aug 4, Tuesday</b>
                                <p>2.30pm - 3.30pm (60min)</p>
                              </div>
                            </td>
                            <td>
                              <div className="date">
                                <b>Lessons 30</b>
                                <p>3.1 Reading 4</p>
                              </div>
                            </td>
                            <td>
                              <a href="#">Confirmed</a>
                            </td>
                            <td>
                              <Link
                                to={PATH.Classes.EditClasses}
                                className="btn btn-info"
                              >
                                Reschedule
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="date">
                                <b>Aug 5, Wednesday</b>
                                <p>3.00pm - 4.30pm (90min)</p>
                              </div>
                            </td>
                            <td>
                              <div className="date">
                                <b>Lessons 31</b>
                                <p>3.2 Listening 4</p>
                              </div>
                            </td>
                            <td>
                              <a href="#">Confirmed</a>
                            </td>
                            <td>
                              <Link
                                to={PATH.Classes.EditClasses}
                                className="btn btn-info"
                              >
                                Reschedule
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="date">
                                <b>Aug 6, Thursday</b>
                                <p>11.00am - 12.00pm (20min)</p>
                              </div>
                            </td>
                            <td>
                              <div className="date">
                                <b>Lessons 32</b>
                                <p>3.3 Writing 4</p>
                              </div>
                            </td>
                            <td>
                              <a href="#">Confirmed</a>
                            </td>
                            <td>
                              <Link
                                to={PATH.Classes.EditClasses}
                                className="btn btn-info"
                              >
                                Reschedule
                              </Link>
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
          <div className="col-12 col-lg-12 col-xl-6 d-flex">
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
