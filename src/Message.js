import React from 'react';

const Message = ({chat, user}) => (
//determines the layout of message , if the message is from sender then the layout of the message will be right
// else left. Can also be differentiated with color of the messages.
    <li className={`chat ${user === chat.username ? "right" : "left"}`}>
        <p>{chat.text}</p>
    </li>
);

export default Message;