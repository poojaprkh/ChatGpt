import React from 'react';

const Chat = ({ message, type }) => {
    // Determine the background color and border radius based on the message type
    const bgColor = type === "send" ? 'bg-violet-500' : 'bg-gray-900';

    const roundedCorners = type === "send" ? 'rounded-tr-lg' : 'rounded-tl-lg';

    return (
        <div className={`flex w-full ${type === "send" ? "justify-start" : "justify-end"}`}>
            <div className={`${bgColor} ${roundedCorners} rounded-b-lg p-3 ml-2 text-white `}>
                {message}
            </div>
        </div>
    );
}

export default Chat;
