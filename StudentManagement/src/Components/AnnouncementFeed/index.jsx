import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuthRedux } from "../../hooks/useAuthRedux";
import { handleError } from "../../utils/handleError";
import { Popconfirm, message } from "antd";
import { useAsync } from "../../hooks/useAsync";
import { useReload } from "../../hooks/useReload";
import { announcementService } from "../../services/announcement";
import { useState } from "react";
import { ButtonCom } from "../../Components/Button";

export const AnnouncementFeed = ({ _id, title, description, updatedAt }) => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const [selectedAnnoucement, setSelectedAnnouncement] = useState({})
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const { excute: deleteAnnouncement } = useAsync(
    announcementService.deleteAnnouncement
  );

  const onSelectAnnouncement = async (ev) => {
    // ev.preventDefault();
    // setSelectedAnnouncement(ev);
    // console.log(ev);
    navigate(PATH.Announcement.EditAnnouncements);
  }

  const onDelete = async (ev) => {
    try {
      const res = await deleteAnnouncement(ev);
      if (res) {
        window.location.reload();
        message.success("Successfully deleted the announcement!");
      }
    } catch (err) {
      handleError(err);
    }
    // Popconfirm({
    //   title: "Delete announcement?",
    //   description:
    //     "Are you sure you want to delete this announcement? All data also deleted!",
    // onConfirm:
    // });
  };

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
          <ButtonCom
            onClick={onSelectAnnouncement}
            className="btn btn-info mr-3"
          >
            <i className="fas fa-pen mr-2" />
            Edit
          </ButtonCom>
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
              onDelete({ _id });
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
          <Link to={PATH.Announcement} className="btn btn-info">
            View
          </Link>
        </div>
      )}
    </li>
  );
};
