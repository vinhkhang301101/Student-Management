import { Link, generatePath, useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuthRedux } from "../../hooks/useAuthRedux";
import { Popconfirm, message } from "antd";
import { useAsync } from "../../hooks/useAsync";
import { announcementService } from "../../services/announcement";
import { useState } from "react";
// import { handleError } from "../../utils/handleError";
// import { useReload } from "../../hooks/useReload";
// import { ButtonCom } from "../../components/Button";

export const AnnouncementList = ({ announcementID, title, description, updatedAt }) => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const [selectedAnnoucement, setSelectedAnnouncement] = useState({});
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const { excute: deleteAnnouncement } = useAsync(
    announcementService.deleteAnnouncement
  );

  const onDelete = async (ev) => {
    try {
      const res = await deleteAnnouncement(ev);
      if (res) {
        window.location.reload();
        message.success(`Successfully deleted ${title} information!`);
      }
    } catch (err) {
      // handleError(err);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="skill-info d-flex justify-content-between">
          <div className="right-content">
            <Link
              to={generatePath(PATH.Announcement.announcementDetails, {
                id: announcementID,
              })}
            >
              <h5 className="text-danger fw-bold">{title}</h5>
            </Link>
            <p className="post-date mt-3">{updatedAt}</p>
            <p className="mt-4">{description}</p>
          </div>
          {user?.role == "Teacher" ? (
            <div className="right-content">
              <Link
                to={generatePath(PATH.Announcement.EditAnnouncements, {
                  id: announcementID,
                })}
                className="btn btn-info mr-3"
              >
                <i className="fas fa-pen mr-2" />
                Edit
              </Link>
              <Popconfirm
                open={openPopconfirm}
                onOpenChange={(visible) => setOpenPopconfirm(visible)}
                okText="Yah Sure!"
                cancelText="Nah!"
                placement="bottomRight"
                title="Alert! Delete Announcement?"
                description="Are you sure you want to delete this announcement? All data also deleted!"
                onConfirm={() => {
                  setOpenPopconfirm(false);
                  onDelete(announcementID);
                }}
              >
                <a
                  onClick={(ev) => ev.preventDefault()}
                  className="btn btn-info"
                  href="#!"
                >
                  <i className="fas fa-trash" />
                </a>
              </Popconfirm>
            </div>
          ) : (
            <div className="actions">
              <Link
                to={generatePath(PATH.Announcement.announcementDetails, {
                  id: announcementID,
                })}
                className="btn btn-info"
              >
                View
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
