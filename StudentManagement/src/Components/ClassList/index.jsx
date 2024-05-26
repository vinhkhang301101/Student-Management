import { Link } from "react-router-dom";
import { PATH } from "../../config/path";

export const ClassList = ({ code, subject, slot }) => {
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
        <div className="actions">
          <Link
            to={PATH.Classes.EditClasses}
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
