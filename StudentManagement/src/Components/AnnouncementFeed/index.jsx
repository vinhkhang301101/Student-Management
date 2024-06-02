import { Link } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuthRedux } from "../../hooks/useAuthRedux";

export const AnnouncementFeed = ({ title, description, updatedAt }) => {
  const { user } = useAuthRedux();
  return (
    <li className="feed-item d-flex justify-content-between align-items-center">
      <div>
        <div className="feed-date1">{updatedAt}</div>
        <p className="feed-text1">
          <a className="text-danger">{title}</a>
        </p>
        <p className="text-sm text-dark">{description}</p>
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
    </li>
  );
};
