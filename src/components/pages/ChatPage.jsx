import React, { useEffect, useState } from 'react';
import ChatBody from './ChatBody';
import ChatBar from './ChatBar';
import ChatFooter from './ChatFooter';
import instance from '../../axios/instance';

const ChatPage = ( { socket } ) => {
    const [ messages, setMessages ] = useState( [] );
    const [ user, setUser ] = useState( [] )
    useEffect( () => {
        async function fetchData() {
            try {
                const { data } = await instance.get( '/' );
                setMessages( data );
            } catch ( error ) {
                console.error( 'Error fetching messages:', error );
            }
        }
        fetchData();
    }, [] );

    useEffect( () => {
        socket.on( 'messageResponse', ( data ) => setMessages( [ ...messages, data ] ) );
    } );

    function handleAdd( data ) {
        setUser( data )
        console.log( data )
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-800 text-white">
                <ChatBar handleAdd={ handleAdd } messages={ messages } />
            </div>
            <div className="w-3/4 flex flex-col">
                <ChatBody user={ user } messages={ messages } />
                <ChatFooter socket={ socket } />
            </div>
        </div>
    );
};

export default ChatPage;

