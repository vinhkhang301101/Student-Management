import React from "react";
import { MainLayouts } from "../layouts/MainLayouts";
import { PATH } from "../config/path";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { StudentDashboard } from "../pages/student-dashboard";
import { ForgotPassword } from "../pages/forgot-password";
import { Page404 } from "../pages/page404";
import { Inbox } from "../pages/inbox";
import { NewMail } from "../pages/new-mail";
import { GuestRoute } from "../Components/GuestRoute";
import { PrivateRoute } from "../Components/PrivateRoute";
import { profile } from "./profile";
import { students } from "./students";
import { teachers } from "./teachers";
import { classes } from "./classes";
import { fees } from "./fees";
import { announcement } from "./announcements";
import { homepage } from "./homepage";
import { RecoverPassword } from "../pages/recover-password";

export const routers = (user, login, logout) => [
  {
    path: "*",
    element: <Page404 />,
  },

  {
    element: <GuestRoute redirect={PATH.Home} />,
    path: PATH.Login,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },

  {
    path: PATH.Register,
    element: <Register />,
  },

  {
    path: PATH.ForgotPassword,
    element: <ForgotPassword />,
  },

  {
    path: PATH.RecoverPassword,
    element: <RecoverPassword />,
  },

  {
    element: <MainLayouts />,
    children: [
      {
        element: <PrivateRoute redirect={PATH.Login} />,
        children: [
          {
            children: homepage,
            path: PATH.Home,
          },

          {
            children: students,
            path: PATH.Students.index,
          },

          {
            children: teachers,
            path: PATH.Teachers.index,
          },

          {
            children: classes,
            path: PATH.Classes.index,
          },

          {
            path: PATH.Inbox,
            element: <Inbox />,
          },

          {
            path: PATH.NewMail,
            element: <NewMail />,
          },

          {
            children: fees,
            path: PATH.Fees.index,
          },

          {
            children: announcement,
            path: PATH.Announcement.index,
          },

          {
            children: profile,
            path: PATH.Profile.index,
          },
        ],
      },
    ],
  },
];
