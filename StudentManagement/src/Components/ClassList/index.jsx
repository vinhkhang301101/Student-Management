import { Link, generatePath, useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuthRedux } from "../../hooks/useAuthRedux";
import { useState } from "react";
import { useAsync } from "../../hooks/useAsync";
import { Popconfirm } from "antd";
import { classService } from "../../services/class";

export const ClassList = ({ _id, code, subject, slot }) => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState({});
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const { excute: removeClass } = useAsync(classService.removeClass);

  const onDelete = async (ev) => {
    try {
      const res = await removeClass(ev);
      if (res) {
        window.location.reload();
        message.success(`Successfully deleted ${subject} information!`);
      }
    } catch (err) {
      // handleError(err);
    }
  };

  return (
    <tr>
      <td>{code}</td>
      <td>
        <h2>
          <a>{subject}</a>
        </h2>
      </td>
      <td>{slot}</td>
      <td className="text-right">
        {user.role == "Teacher" ? (
          <div className="actions">
            <Link
              to={generatePath(PATH.Classes.EditClasses, {
                id: _id,
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
              title="Alert! Delete Class?"
              description="Are you sure you want to delete this class? All data also deleted!"
              onConfirm={() => {
                setOpenPopconfirm(false);
                onDelete(_id);
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
            <Link to={PATH.Classes} className="btn btn-info">
              View
            </Link>
          </div>
        )}
      </td>
    </tr>
  );
};
