import { PATH } from "../config/path";
import { EditClasses } from "../pages/edit-class";
import { Classes } from "../pages/classes";
import { AddClasses } from "../pages/add-class";
// import { ClassDetails } from "../pages/class-details";

export const classes = [
  {
    element: <Classes />,
    index: true,
  },

  {
    element: <EditClasses />,
    path: PATH.Classes.EditClasses,
  },

  {
    element: <AddClasses />,
    path: PATH.Classes.AddClasses,
  },

  // {
  //   element: <ClassDetails />,
  //   path: PATH.Classes.ClassDetails,
  // },
];
