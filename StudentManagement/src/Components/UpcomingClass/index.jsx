import React from 'react'
import { Link, generatePath } from 'react-router-dom';
import { PATH } from '../../config/path';

export const UpcomingClass = ({ _id, code, subject, slot }) => {
  return (
    <>
      <tr className="d-flex align-items-center justify-content-between">
        <td className="pt-1 pb-1">
          <div className="class-info">
            <b>{code}</b>
          </div>
        </td>
        <td>
          <div className="class-info">
            <b>{subject}</b>
          </div>
        </td>
        <td>
          <a href="#">Confirmed</a>
          <Link to={PATH.Classes.EditClasses} className="btn btn-info ml-5">
            Reschedule
          </Link>
        </td>
      </tr>
    </>
  );
}
