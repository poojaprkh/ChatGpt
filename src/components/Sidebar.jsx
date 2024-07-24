import React from 'react';

const Sidebar = ({ questions }) => {
    return (
        <div className="w-60 flex-shrink-0 bg-gray-100 h-screen fixed top-0 left-0">
            <ul className="overflow-y-auto h-full">
                {/* {questions.map((question, index) => (
                    <li key={index} className="p-4 border-b hover:bg-gray-200 cursor-pointer">
                        {question}
                    </li>
                ))} */}
                <li className="p-4 border-b hover:bg-gray-200 cursor-pointer">
                    hello
                </li>
                <li className="p-4 border-b hover:bg-gray-200 cursor-pointer">
                    hello
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
