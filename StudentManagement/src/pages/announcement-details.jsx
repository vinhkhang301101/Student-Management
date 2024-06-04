import React from 'react'
import { Link } from 'react-router-dom';
import { PATH } from '../config/path';
import { useQuery } from '../hooks/useQuery';
import { announcementService } from '../services/announcement';

export const AnnouncementDetails = () => {
  const { data, loading } = useQuery({
    queryFn: () => announcementService.getAnnouncement(),
  });

  if (loading) return null;

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Announcement Details</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Announcement.index}>Announcements</Link>
                </li>
                <li className="breadcrumb-item active">Announcement Details</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col ml-md-n2">
                  <h3 className="text-danger fw-bold">Testing</h3>
                  <p className="post-date mb-0">Nov 30th</p>
                </div>
                <div className="col-auto profile-btn">
                  <Link
                    to={PATH.Profile.EditProfile}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-pen mr-2" />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Description</span>
                      </h5>
                      <span>Testing...</span>
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
}
