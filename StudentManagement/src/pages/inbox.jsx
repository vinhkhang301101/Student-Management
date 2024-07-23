import React, { useEffect, useRef, useState } from "react";
import { ChatList } from "../Components/ChatList/index.jsx";
import { Link } from "react-router-dom";
import { uniqBy } from "lodash";
import { CHAT_SERVER, CHAT_API, USER_API } from "../config/api.js";
import { useAuthRedux } from "../hooks/useAuthRedux.js";
import { ButtonCom } from "../Components/Button/index.jsx";
import { http } from "../utils/http.js";

export const Inbox = () => {
  const { user } = useAuthRedux();
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const divUnderMessage = useRef();

  console.log(messages);

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);

  function connectToWs() {
    console.log("Connected to Chat Server!");
    const ws = new WebSocket(CHAT_SERVER, [
      "draft",
      `${user._id}`,
      `${user.userID}`,
    ]);
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      console.log("Server chat is closing...");
      setTimeout(() => {
        console.log("Disconnected. Trying to reconnect!");
        connectToWs();
      }, 1000);
    });
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    console.log(messageData);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender == selectedUserId) {
        setMessages((prev) => ([...prev, { ...messageData }]));
      }
    }
  }

  function showOnlinePeople(peopleArr) {
    const people = {};
    peopleArr.forEach(({ _id, userID }) => {
      people[_id] = userID;
    });
    setOnlinePeople(people);
  }

  const sendMessage = (ev) => {
    ev.preventDefault();
    ws.send(
      JSON.stringify({
        receiver: selectedUserId,
        text: newMessageText,
      })
    );
    setNewMessageText("");

    setMessages((prev) => ([
      ...prev,
      {
        text: newMessageText,
        sender: user._id,
        receiver: selectedUserId,
        _id: Date.now(),
      },
    ]));
  };

  useEffect(() => {
    const div = divUnderMessage.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    http.get(`${USER_API}/people`).then((res) => {
      const offlinePeopleArr = res.people
        .filter((p) => p._id !== user._id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p.userID;
      });
      setOfflinePeople(offlinePeople);
    });
  }, [onlinePeople]);

  
  useEffect(() => {
    if (selectedUserId) {
      console.log(selectedUserId);
      http.get(`${CHAT_API}/${selectedUserId}`).then((res) => {
        setMessages(res.messages);
      });
    }
  }, [selectedUserId]);
  
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
                  {user?.role == "Teacher" && (
                    <>
                      {Object.keys(onlinePeopleExceptOurUser).map((_id) => (
                        <ChatList
                          key={_id}
                          id={_id}
                          online={true}
                          userID={onlinePeopleExceptOurUser[_id]}
                          onClick={() => setSelectedUserId(_id)}
                          selected={_id === selectedUserId}
                        />
                      ))}
                      {Object.keys(offlinePeople).map((_id) => (
                        <ChatList
                          key={_id}
                          id={_id}
                          online={false}
                          userID={offlinePeople[_id]}
                          onClick={() => setSelectedUserId(_id)}
                          selected={_id === selectedUserId}
                        />
                      ))}
                    </>
                  )}
                  {user?.role == "Student" && (
                    <ChatList
                      key={"66542b01bb9c22fbd568ca5e"}
                      id={"66542b01bb9c22fbd568ca5e"}
                      online={Object.keys(onlinePeople).some(
                        (onlinePersonID) =>
                          onlinePersonID == "66542b01bb9c22fbd568ca5e"
                      )}
                      userID={"T001"}
                      onClick={() => {
                        setSelectedUserId("66542b01bb9c22fbd568ca5e");
                      }}
                      selected={selectedUserId === "66542b01bb9c22fbd568ca5e"}
                    />
                  )}
                </ul>
              </div>
              <div className="chat">
                {!selectedUserId && (
                  <div className="chat-history">
                    <div className="not-selected text-dark">
                      <i className="fas fa-caret-left"></i>
                      Select a person to chat!
                    </div>
                  </div>
                )}
                {!!selectedUserId && (
                  <>
                    <div className="chat-header clearfix">
                      <div className="row">
                        <div className="col-lg-6 d-flex align-items-center">
                          <div className="chat-avatar">
                            <div className="avatar">
                              <img src="img/avatar.png" alt="avatar" />
                            </div>
                          </div>
                          <div className="chat-about">
                            <h6 className="fw-bold mb-0">
                              {selectedUserId}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-history">
                      <ul className="m-b-0">
                        {messagesWithoutDupes.map((messages) => (
                          <li key={messages._id} className="clearfix">
                            <div
                              className={
                                "message-data " +
                                (messages.sender == user._id
                                  ? "text-right"
                                  : "text-left")
                              }
                            >
                              <img src="img/avatar.png" alt="avatar" />
                            </div>
                            <div
                              className={
                                "message " +
                                (messages.sender == user._id
                                  ? "my-message float-right"
                                  : "other-message float-left")
                              }
                            >
                              {messages.text}
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
                        className="input-group-text"
                      >
                        <i className="fa fa-send" />
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
