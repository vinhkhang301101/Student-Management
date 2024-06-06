import { Link, generatePath, } from "react-router-dom";
import { PATH } from "../../config/path";

export const StudentList = ({ _id, firstname, lastname, studentID, classcode, gender, date, phone, address, paidammounts, status}) => {
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
        <span className="badge badge-success">{status}</span>
      </td>
      <td className="text-right">
        <div className="actions">
          <Link
            to={generatePath(PATH.Students.EditStudents, {
              id: _id,
            })}
            className="btn btn-sm bg-success-light mr-2"
          >
            <i className="fas fa-pen" />
          </Link>
          <a href="#" className="btn btn-sm bg-danger-light">
            <i className="fas fa-trash" />
          </a>
        </div>
      </td>
    </tr>
  );
};
