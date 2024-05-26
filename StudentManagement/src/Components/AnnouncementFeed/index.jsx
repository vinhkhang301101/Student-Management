import { Link } from "react-router-dom";
import { PATH } from "../../config/path";

export const AnnouncementFeed = ({ title, description, date }) => {
  return (
    <li className="feed-item d-flex justify-content-between align-items-center">
      <div>
        <div className="feed-date1">Posted on: Sep 04, 2:00 pm</div>
        <span className="feed-text1">
          <a className="text-danger">{title}</a>
        </span>
      </div>
      <Link to={PATH.Announcement.EditAnnouncements} className="btn btn-info">
        <i className="fas fa-pen mr-2" />
        Edit
      </Link>
    </li>
  );
};
