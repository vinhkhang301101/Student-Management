import { Link, generatePath, } from "react-router-dom";
import { PATH } from "../../config/path";
import { useState } from "react";
import { Popconfirm } from "antd";
import { userService } from "../../services/user";
import { useAsync } from "../../hooks/useAsync";

export const StudentList = ({ _id, fullname, firstname, lastname, studentID, classcode, gender, date, phone, address, paidStatus}) => {
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const { excute: deleteStudent } = useAsync(userService.deleteStudent);

  const onDelete = async (ev) => {
    try {
      const res = await deleteStudent(ev);
      if (res) {
        window.location.reload();
        message.success(`Successfully deleted ${fullname} information!`);
      }
    } catch (err) {
      // handleError(err);
    }
  };

  return (
    <tr>
      <td>{studentID}</td>
      <td>
        <Link
          className="text-black"
          to={generatePath(PATH.Students.StudentDetails, {
            id: _id,
          })}
        >
          {firstname}
        </Link>
      </td>
      <td>
        <Link
          className="text-black"
          to={generatePath(PATH.Students.StudentDetails, {
            id: _id,
          })}
        >
          {lastname}
        </Link>
      </td>
      <td>{classcode}</td>
      <td>{gender}</td>
      <td>{date}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td className="text-right">
        <span
          className={
            "badge " + (paidStatus == "Paid" ? "badge-success" : "badge-danger")
          }
        >
          {paidStatus}
        </span>
      </td>
      <td className="text-right">
        <div className="actions">
          <Link
            to={generatePath(PATH.Students.EditStudents, {
              id: _id,
            })}
            className="btn btn-info mr-2"
          >
            <i className="fas fa-pen" />
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
      </td>
    </tr>
  );
};
