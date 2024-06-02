import { Link } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuthRedux } from "../../hooks/useAuthRedux";

export const ClassList = ({ code, subject, slot }) => {
  const { user } = useAuthRedux();
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
              to={PATH.Classes.EditClasses}
              className="btn btn-sm bg-success-light mr-2"
            >
              <i className="fas fa-pen" />
            </Link>
            <a href="#" className="btn btn-sm bg-danger-light">
              <i className="fas fa-trash" />
            </a>
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
