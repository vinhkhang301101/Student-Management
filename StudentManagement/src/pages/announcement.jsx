import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement.js";
import { AnnouncementList } from "../Components/AnnouncementList/index.jsx";
import { useAnnouncement } from "../hooks/useAnnouncement";

export const Announcement = () => {
  const { announcement } = useAnnouncement();
  const { data, loading } = useQuery({
    queryFn: () => announcementService.getAnnouncement(),
  });

  console.log(announcement);

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
            {announcement?.data.length ? (
              <div className="card-body">
                {data.data.data.map((e) => (
                  <AnnouncementList key={e._id} {...e} />
                ))}
              </div>
            ) : (
              <div className="card-body">
                <div className="row mt-2">
                  <h5 className="text-danger fw-bold text-center">
                    There are no announcement now, update soon!!
                  </h5>
                </div>
              </div>
            )}
            {/* <div className="card-body">
              {data.data.map((e) => (
                <AnnouncementList key={e._id} {...e} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
