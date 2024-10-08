import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Empty } from "antd";
import { PATH } from "../../config/path";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../stores/auth";
import { useAuthRedux } from "../../hooks/useAuthRedux";

export const Header = () => {
  const { user } = useAuthRedux();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate(PATH.Login);
  }

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/img/blackLogo.png" alt="Logo" />
          </Link>
          <Link to="/" className="logo logo-small">
            <img
              src="/img/small-black-logo.png"
              alt="Logo"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <a href="javascript:void(0);" id="toggle_btn">
          <i className="fas fa-align-left" />
        </a>
        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <i className="fas fa-search" />
            </button>
          </form>
        </div>
        <a href="#" className="mobile_btn " id="mobile_btn">
          <i className="fas fa-bars" />
        </a>
        <ul className="nav user-menu">
          <li className="nav-item dropdown noti-dropdown">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <Badge color="#18aefa" size="small" count={0} overflowCount={99}>
                <i className="far fa-bell w-18" />
              </Badge>
            </a>
            <div
              className="dropdown-menu notifications"
              x-placement="bottom-start"
            >
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="javascript:void(0)" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </a>
              </div>
              <div className="noti-content">
                <Empty
                  className="mt-2"
                  description={
                    <h4 className="text-danger fw-bold text-center fs-5">
                      There are no notification now!!
                    </h4>
                  }
                />
                {/* <ul className="notification-list">
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src="/img/avatar.png"
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Carlson Tech</span> has
                            joined{" "}
                            <span className="noti-title">your class</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src="/img/avatar.png"
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">
                              International Software Inc
                            </span>{" "}
                            has sent you a invoice in the amount of{" "}
                            <span className="noti-title">218.000 VND</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src="/img/avatar.png"
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">John Hendry</span> sent
                            a request to join{" "}
                            <span className="noti-title">Class 5</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src="/img/avatar.png"
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Gwen Stacy</span> sent
                            a request to join{" "}
                            <span className="noti-title">Class 3</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul> */}
              </div>
              {/* <div className="topnav-dropdown-footer">
                <a href="#">View all Notifications</a>
              </div> */}
            </div>
          </li>
          <Dropdown
            arrow
            placement="bottom"
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <Link
                      className="dropdown-item text-center"
                      to={PATH.Profile.index}
                    >
                      My Profile
                    </Link>
                  ),
                },

                {
                  key: 2,
                  label: (
                    <Link className="dropdown-item text-center" to={PATH.Inbox}>
                      Inbox
                    </Link>
                  ),
                },

                {
                  key: 3,
                  label: (
                    <a
                      href="#"
                      className="dropdown-item text-center"
                      onClick={(ev) => {
                        ev.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      Logout
                    </a>
                  ),
                },
              ],
            }}
          >
            <li className="nav-item">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <span>
                  <i className="fas fa-user" /> {user?.fullname}
                </span>
              </a>
            </li>
          </Dropdown>
        </ul>
      </div>
    </>
  );
};
