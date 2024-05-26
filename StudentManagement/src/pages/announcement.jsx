import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement.js";
import { AnnouncementList } from "../Components/AnnouncementList/index.jsx";

export const Announcement = () => {
  const { data, loading } = useQuery({
    queryFn: () => announcementService.getAnnouncement(),
  });

  if (loading) return null;

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Announcements</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Announcements</li>
              </ul>
            </div>
            <div className="col-auto text-right float-right ml-auto">
              <Link
                to={PATH.Announcement.AddAnnouncements}
                className="btn btn-primary"
              >
                <i className="fas fa-plus" /> Add Announcement
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body">
              {
                data.data.data.map(e => <AnnouncementList key={e._id} {...e} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};