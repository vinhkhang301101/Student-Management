import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement.js";
import { AnnouncementList } from "../components/AnnouncementList/index.jsx";
import { Empty, Spin } from 'antd';
import { useAuthRedux } from "../hooks/useAuthRedux.js";
import { useReload } from "../hooks/useReload.js";
import { ButtonCom } from "../components/Button/index.jsx";
import ModalAddAnnouncement from "../components/AnnouncementModal/index.jsx";

export const Announcement = () => {
  const { user } = useAuthRedux();
  // const [openModalAnnouncement, setOpenModalAnnouncement] = useState(false);
  // const { reload: reloadAnnouncement, ForceReload: ForceReloadAnnouncement } = useReload();
  const { data, loading } = useQuery({
    queryFn: () => announcementService.getAnnouncement(),
    // dependencyList: [reloadAnnouncement],
  });
  
  if (loading) {
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
            {user?.role == "Teacher" ? (
              <div className="col-auto text-right float-right ml-auto">
                <Link to={PATH.Announcement.AddAnnouncements}
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus" /> Add Announcement
                </Link>
                {/* <ButtonCom
                  onClick={() => setOpenModalAnnouncement(true)}
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus" /> Add Announcement
                </ButtonCom> */}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="card">
            {data?.data.length ? (
              <div className="card-body">
                {data?.data.map((e) => (
                  <AnnouncementList key={e._id} {...e} />
                ))}
              </div>
            ) : (
              <div className="card-body">
                <div className="row mt-2">
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
                </div>
              </div>
            )}
            {/* <div className="card-body">
              {data?.data.map((e) => (
                <AnnouncementList key={e._id}  {...e} />
              ))}
            </div> */}
          </div>
        </div>
        {/* {user?.role == "Teacher" && (
          <ModalAddAnnouncement
            openModalAnnouncement={openModalAnnouncement}
            setOpenModalAnnouncement={setOpenModalAnnouncement}
            ForceReloadAnnouncement={ForceReloadAnnouncement}
          />
        )} */}
      </div>
    </>
  );
};
