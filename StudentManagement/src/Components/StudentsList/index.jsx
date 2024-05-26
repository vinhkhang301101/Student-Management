import { Link } from "react-router-dom";
import { PATH } from "../../config/path";

export const StudentList = ({ firstname, lastname, studentId, classcode, gender, date, phone, address, paidammounts, status}) => {
  return (
    <tr>
      <td>{studentId}</td>
      <td>
        <Link to={PATH.Students.StudentDetails}>{firstname}</Link>
      </td>
      <td>
        <Link to={PATH.Students.StudentDetails}>{lastname}</Link>
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
            to={PATH.Students.EditStudents}
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
