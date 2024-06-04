import React from 'react'

export const ChatList = ({ fullname }) => {
  return (
    <li className="clearfix d-flex align-items-center">
        <img src="img/avatar.png" alt="avatar" />
        <div className="about">
            <div className="name fw-bold">{fullname}</div>
        </div>
    </li>
  )
}

