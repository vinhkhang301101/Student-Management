import React from 'react'

export const ChatList = ({ id, fullname, onClick, selected, online }) => {
  return (
    <li
      key={id}
      onClick={() => onClick(id)}
      className={
        "clearfix d-flex align-items-center pl-0 pr-0" +
        (selected ? "active" : "")
      }
    >
      <div className="relative">
        <img src="img/avatar.png" alt="avatar" />
        {online && (
          <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-0 rounded-full border border-white"></div>
        )}
        {!online && (
          <div className="absolute w-3 h-3 bg-gray-400 bottom-0 right-0 rounded-full border border-white"></div>
        )}
      </div>
      <div className="about">
        <div className="name fw-bold">{fullname}</div>
      </div>
    </li>
  );
};

