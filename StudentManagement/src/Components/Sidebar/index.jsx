import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../stores/auth";
import { useAuthRedux } from "../../hooks/useAuthRedux";

export const Sidebar = () => {
  const { user } = useAuthRedux();
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   if (!user) {
//     navigate(PATH.Login);
//   }

  return (
    <>
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner">
            <div id="sidebar-menu" className="sidebar-menu">
                {user?.role == "Teacher" ? (
                <ul>
                    <li className="menu-title">
                    <span>Main Menu</span>
                    </li>
                    <li className="submenu">
                    <NavLink to="/">
                        <i className="fas fa-home" /> <span> Home</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li className="submenu">
                    <NavLink to={PATH.Students.index}>
                        <i className="fas fa-user-graduate" />{" "}
                        <span> Students</span> <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    {/* <li className="submenu">
                    <NavLink to={PATH.Teachers.index}>
                    <i className="fas fa-chalkboard-teacher" />{" "}
                    <span> Teachers</span> <span className="menu-arrow" />
                    </NavLink>
                </li> */}
                    <li className="submenu">
                    <NavLink to={PATH.Classes.index}>
                        <i className="fas fa-book-reader" /> <span> Classes</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li className="submenu">
                    <NavLink to={PATH.Profile.index}>
                        <i className="fas fa-id-card" /> <span> Profile</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li className="submenu">
                    <NavLink to={PATH.Inbox}>
                        <i className="fas fa-comment" /> <span> Inbox</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li className="submenu">
                    <NavLink to={PATH.Announcement.index}>
                        <i className="fas fa-bell" /> <span> Annoucements</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to={PATH.Fees.index}>
                        <i className="fas fa-comment-dollar" /> <span>Fees</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li>
                    <a
                        href="#"
                        // className="dropdown-item text-center"
                        onClick={(ev) => {
                        ev.preventDefault();
                        dispatch(logoutAction());
                        }}
                    >
                        <i className="fas fa-share" /> <span>Logout</span>{" "}
                        <span className="menu-arrow" />
                    </a>
                    </li>
                </ul>
                ) : (
                <ul>
                    <li className="menu-title">
                    <span>Main Menu</span>
                    </li>
                    <li className="submenu">
                    <NavLink to="/">
                        <i className="fas fa-home" /> <span> Home</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    {/* <li className="submenu">
                    <NavLink to={PATH.Teachers.index}>
                    <i className="fas fa-chalkboard-teacher" />{" "}
                    <span> Teachers</span> <span className="menu-arrow" />
                    </NavLink>
                </li> */}
                    <li className="submenu">
                    <NavLink to={PATH.Profile.index}>
                        <i className="fas fa-id-card" /> <span> Profile</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li className="submenu">
                    <NavLink to={PATH.Inbox}>
                        <i className="fas fa-comment" /> <span> Inbox</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li className="submenu">
                    <NavLink to={PATH.Announcement.index}>
                        <i className="fas fa-bell" /> <span> Annoucements</span>{" "}
                        <span className="menu-arrow" />
                    </NavLink>
                    </li>
                    <li>
                    <a
                        href="#"
                        // className="dropdown-item text-center"
                        onClick={(ev) => {
                        ev.preventDefault();
                        dispatch(logoutAction());
                        }}
                    >
                        <i className="fas fa-share" /> <span>Logout</span>{" "}
                        <span className="menu-arrow" />
                    </a>
                    </li>
                </ul>
                )}
            </div>
            </div>
        </div>
    </>
  );
};
