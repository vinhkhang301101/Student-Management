import { Link } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuthRedux } from "../../hooks/useAuthRedux";

export const AnnouncementList = ({ title, description, updatedAt }) => {
  const { user } = useAuthRedux();
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="skill-info d-flex justify-content-between">
          <div className="right-content">
            <h5 className="text-danger fw-bold">{title}</h5>
            <p className="post-date mt-3">{updatedAt}</p>
            <p className="mt-4">{description}</p>
          </div>
          {user.role == "Teacher" ? (
            <div className="right-content">
              <Link
                to={PATH.Announcement.EditAnnouncements}
                className="btn btn-info mr-3"
              >
                <i className="fas fa-pen mr-2" />
                Edit
              </Link>
              <a href="#" className="btn btn-info">
                <i className="fas fa-trash" />
              </a>
            </div>
          ) : (
            <div className="actions">
              <Link to={PATH.Announcement} className="btn btn-info">
                View
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
