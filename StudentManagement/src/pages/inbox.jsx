import React, { useEffect, useRef, useState } from "react";
import { userService } from "../services/user.js";
import { chatService } from "../services/chat.js";
import { ChatList } from "../Components/ChatList/index.jsx";
import { Link } from "react-router-dom";
import { uniqBy } from "lodash";
import { CHAT_SERVER } from "../config/api.js";
import { useAuthRedux } from "../hooks/useAuthRedux.js";
import { ButtonCom } from "../Components/Button/index.jsx";

export const Inbox = () => {
  const { user } = useAuthRedux();
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const divUnderMessage = useRef();

  // const { data, loading } = useQuery({
  //   queryFn: () => userService.getUsers(),
  // });

  // if (loading) return null;

  useEffect(() => {
    connectToWs();
  }, [selectedStudentId]);

  function connectToWs() {
    console.log("connect to server");
    const ws = new WebSocket(CHAT_SERVER, [
      "draft",
      `${user._id}`,
      `${user.fullname}`,
    ]);
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      console.log("server chat close");
      setTimeout(() => {
        console.log("Disconnected. Trying to reconnect");
        connectToWs();
      }, 1000);
    });
  }

  useEffect(() => {
    const div = divUnderMessage.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    userService.getPeople.then((res) => {
      const offlinePeopleArr = res.people
        .filter((p) => p._id !== user._id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p.fullname;
      });
      setOfflinePeople(offlinePeople);
    });
  }, [onlinePeople]);

  useEffect(() => {
    if (selectedStudentId) {
      chatService.getFullChats(selectedStudentId).then((res) => {
        setMessages(res.messages);
      });
    }
  }, [selectedStudentId]);

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else {
      if (messageData.sender == selectedStudentId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  }

  function showOnlinePeople(peopleArr) {
    const people = {};
    peopleArr.forEach(({ _id, fullname, role }) => {
      people[_id] = fullname;
    });
    setOnlinePeople(people);
  }

  const sendMessage = (ev) => {
    ev.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedStudentId,
        text: newMessageText,
      })
    );
    setNewMessageText("");

    setMessages((prev) => [
      ...prev,
      {
        text: newMessageText,
        sender: user._id,
        recipient: selectedStudentId,
        _id: Date.now(),
      },
    ]);
  };

  const onlinePeopleExceptOurUser = { ...onlinePeople };
  delete onlinePeopleExceptOurUser[user._id];

  const messagesWithoutDupes = uniqBy(messages, "_id");

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Inbox</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Inbox</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {user.role == "Teacher" && (
                    <>
                      {Object.keys(onlinePeopleExceptOurUser).map((_id) => (
                        <ChatList
                          key={_id}
                          id={_id}
                          online={true}
                          fullname={onlinePeopleExceptOurUser[_id]}
                          onClick={() => setSelectedStudentId(_id)}
                          selected={_id === selectedStudentId}
                        />
                      ))}
                      {Object.keys(offlinePeople).map((_id) => (
                        <ChatList
                          key={_id}
                          id={_id}
                          online={false}
                          fullname={offlinePeople[_id]}
                          onClick={() => setSelectedStudentId(_id)}
                          selected={_id === selectedStudentId}
                        />
                      ))}
                    </>
                  )}
                  {user.role == "Student" && (
                    <ChatList
                      key={"66542b01bb9c22fbd568ca5e"}
                      id={"66542b01bb9c22fbd568ca5e"}
                      online={Object.keys(onlinePeople).some(
                        (onlinePersonID) =>
                          onlinePersonID == "66542b01bb9c22fbd568ca5e"
                      )}
                      fullname={"Nguyen Van A"}
                      onClick={() => {
                        setSelectedStudentId("66542b01bb9c22fbd568ca5e");
                      }}
                      selected={
                        selectedStudentId === "66542b01bb9c22fbd568ca5e"
                      }
                    />
                  )}
                </ul>
              </div>
              <div className="chat">
                {!selectedStudentId && (
                  <div className="flex h-full flex-grow items-center justify-center">
                    <div className="text-dark">Select a person to chat!</div>
                  </div>
                )}
                {!!selectedUserId && (
                  <>
                    <div className="chat-header clearfix">
                      <div className="row">
                        <div className="col-lg-6 d-flex align-items-center">
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#view_info"
                          >
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
                        {messagesWithoutDupes.map((message) => (
                          <li key={message._id} className="clearfix">
                            <div
                              className={"message-data"(
                                message.sender == user.id
                                  ? "text-right"
                                  : "text-left"
                              )}
                            >
                              <img src="img/avatar.png" alt="avatar" />
                            </div>
                            <div
                              className={"message"(
                                message.sender == user.id
                                  ? "other-message text-right"
                                  : "my-message text-left"
                              )}
                            >
                              {message.text}
                            </div>
                          </li>
                        ))}
                        <div ref={divUnderMessage}></div>
                      </ul>
                    </div>
                  </>
                )}
                {!!selectedUserId && (
                  <form
                    onSubmit={(ev) => sendMessage(ev)}
                    className="chat-message clearfix"
                  >
                    <div className="input-group mb-0">
                      <input
                        type="text"
                        value={newMessageText}
                        onChange={(ev) => {
                          setNewMessageText(ev.target.value);
                        }}
                        className="form-control"
                        placeholder="Enter message here..."
                      />
                      <ButtonCom
                        onClick={(ev) => sendMessage(ev)}
                        className="input-group-prepend"
                      >
                        <span className="input-group-text">
                          <i className="fa fa-send" />
                        </span>
                      </ButtonCom>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
