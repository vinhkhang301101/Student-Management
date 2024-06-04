import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATH } from "../config/path";
import { useQuery } from "../hooks/useQuery";
import { userService } from "../services/user.js";
import { ChatList } from "../Components/ChatList/index.jsx";
import { Empty } from "antd";

export const Inbox = () => {
  const { data, loading } = useQuery({
    queryFn: () => userService.getUsers(),
  });

  if (loading) return null;

  return (
    <>
      <div className="content container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {data?.data.length ? (
                    <div className="card-body">
                      {data.data.map((e) => (
                        <ChatList key={e._id} {...e} />
                      ))}
                    </div>
                  ) : (
                    <div className="card-body">
                      <div className="row mt-2">
                        <Empty
                          description={
                            <h4 className="text-danger fw-bold text-center">
                              There are no other users now!!
                            </h4>
                          }
                        ></Empty>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6 d-flex align-items-center">
                      <a href="#" data-toggle="modal" data-target="#view_info">
                        <img src="img/avatar.png" alt="avatar" />
                      </a>
                      <div className="chat-about">
                        <h6 className="fw-bold mb-0">Nguyen Van B</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    <li className="clearfix">
                      <div className="message-data text-left">
                        <img src="img/avatar.png" alt="avatar" />
                      </div>
                      <div className="message other-message float-left">
                        {" "}
                        Hi Aiden, how are you? How is{" "}
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data text-right">
                        <img src="img/avatar.png" alt="avatar" />
                      </div>
                      <div className="message my-message float-right">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data text-right">
                        <img src="img/avatar.png" alt="avatar" />
                      </div>
                      <div className="message my-message float-right">
                        Project has been already finished and I have results to
                        show you.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter text here..."
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-send" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
