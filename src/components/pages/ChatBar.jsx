import React from 'react';

const ChatBar = ( { messages, handleAdd } ) => {
    // Use a Set to get unique user names
    const uniqueUsers = [ ...new Set( messages && messages.map( message => message.name ) ) ];


    const handleClick = ( e ) => {
        handleAdd( uniqueUsers )
    }
    return (
        <div className="h-full p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
                {
                    uniqueUsers && uniqueUsers?.map( ( name, index ) => (
                        <li key={ index } className="mb-2">
                            <button onClick={ handleClick } className="w-full text-left bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">
                                { name }
                            </button>
                        </li>
                    ) )
                }
            </ul>
        </div>
    );
};

export default ChatBar;

