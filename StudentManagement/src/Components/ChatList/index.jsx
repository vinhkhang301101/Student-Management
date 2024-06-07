import React from 'react'

export const ChatList = ({ id, fullname, onClick, selected, online }) => {
  return (
    <li
      key={id}
      onClick={() => onClick(id)}
      className={
        "clearfix d-flex align-items-center pl-0 pr-0 " +
        (selected ? "active" : "")
      }
    >
      <div className="chat-avatar">
        <div className="avatar">
          <img src="img/avatar.png" alt="avatar" />
        </div>
        {online && <div className="online"></div>}
        {!online && <div className="offline"></div>}
      </div>
      <div className="about">
        <div className="name fw-bold">{fullname}</div>
      </div>
    </li>
  );
};

