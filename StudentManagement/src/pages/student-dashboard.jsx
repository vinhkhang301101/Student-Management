import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useAnnouncement } from "../hooks/useAnnouncement";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement";
import { AnnouncementFeed } from "../Components/AnnouncementFeed";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const StudentDashboard = () => {
  const { announcement } = useAnnouncement();
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
                  {/* {announcement?.data.length ? (
                    <ul className="activity-feed">
                      {data.data.data.map((e) => (
                        <AnnouncementFeed key={e._id} {...e} />
                      ))}
                    </ul>
                  ) : (
                    <h6 className="text-danger fw-bold text-center">
                      There are no announcement now, update soon!!
                    </h6>
                  )} */}
                  <ul className="activity-feed">
                    {data.data.map((e) => (
                      <AnnouncementFeed key={e._id} {...e} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-12 col-xl-12">
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
