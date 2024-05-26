import { PATH } from "../config/path";
import { EditStudents } from "../pages/edit-student";
import { Students } from "../pages/students";
import { AddStudents } from "../pages/add-student";
import { StudentDetails } from "../pages/student-details";

export const students = [
  {
    element: <Students />,
    index: true,
  },

  {
    element: <EditStudents />,
    path: PATH.Students.EditStudents,
  },

  {
    element: <AddStudents />,
    path: PATH.Students.AddStudents,
  },

  {
    element: <StudentDetails />,
    path: PATH.Students.StudentDetails,
  },
];
