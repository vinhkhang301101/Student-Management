import { Link } from "react-router-dom";
import { PATH } from "../../config/path";

export const AnnouncementList = ({ title, description, date }) => {
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="skill-info d-flex justify-content-between">
          <div className="right-content">
            <h5 className="text-danger fw-bold">{title}</h5>
            <p className="post-date mt-3">Posted on: Sep 04, 2:00 pm</p>
            <p className="mt-4">{description}</p>
          </div>
          <div className="left-content">
            <Link
              to={PATH.Announcement.EditAnnouncements}
              className="btn btn-info"
            >
              <i className="fas fa-pen mr-2" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
