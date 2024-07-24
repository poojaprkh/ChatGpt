import React, { useState, useEffect } from 'react';
import Sidebar from '../src/components/Sidebar';
import Header from './components/Header';
import Chat from './components/Chat';
import { io } from 'socket.io-client';
import './App.css'

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    newSocket.on('connect', () => {
      setSocket(newSocket);

      setConnectionError(null); // Reset connection error if previously set
    });

    newSocket.on('response', (data) => {
      console.log('Received response:data', data);
      setMessages((prevMessages) => [...prevMessages, { type: "receive", message: data }]);
    });

    newSocket.on('connect_error', (err) => {
      console.error("Socket.io connection error:", err);
      setConnectionError(err.message);
    });

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, { type: "receive", message }]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage && socket) {
      console.log("connected");
      socket.emit("message", inputMessage);
      console.log(inputMessage);
      setMessages((prevMessages) => [...prevMessages, { type: "send", message: inputMessage }]);
      setInputMessage("");
    }
  };

  if (connectionError) {
    return <div>Connection Error: {connectionError}</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar questions={['ui', 'How are you?', 'What do you do?']} />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="p-4 flex-grow ml-60 mt-16  ">
          <div className="container mx-auto h-full flex flex-col">
            <div className="flex flex-grow items-end">
              <div className='w-full '>
                {messages.map((msg, index) => (
                  <Chat key={index} type={msg.type} message={msg.message} />
                ))}
              </div>
            </div>
            <div className="h-[80px] p-5 flex justify-center items-center">
              <input
                type='text'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything!"
                className='p-3 w-full bg-gray-100 border border-grey rounded-lg'
              />
              <button className='bg-violet-600 px-3 py-2 rounded-md mx-2 text-white' onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
