import { PATH } from "../config/path";
import { EditTeachers } from "../pages/edit-teacher";
import { Teachers } from "../pages/teachers";
import { AddTeachers } from "../pages/add-teacher";
import { TeacherDetails } from "../pages/teacher-details";

export const teachers = [
  {
    element: <Teachers />,
    index: true,
  },

  {
    element: <EditTeachers />,
    path: PATH.Teachers.EditTeachers,
  },

  {
    element: <AddTeachers />,
    path: PATH.Teachers.AddTeachers,
  },

  {
    element: <TeacherDetails />,
    path: PATH.Teachers.TeacherDetails,
  },
];
