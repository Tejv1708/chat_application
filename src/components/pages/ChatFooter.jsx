import React, { useState } from 'react';
import instance from '../../axios/instance';

const ChatFooter = ( { socket, id, friendConversationId } ) => {
    const [ message, setMessage ] = useState( '' );
    const [ files, setFiles ] = useState( [] )

    const handleSendMessage = async ( e ) => {
        e.preventDefault();
        try {

            if ( message.trim() && localStorage.getItem( 'userName' ) ) {
                socket.emit( 'message', {
                    message: message,
                    file: [],
                    name: localStorage.getItem( 'userName' ),
                    receiver_id: id,
                    sender_id: localStorage.getItem( 'id' ),
                    friendsAndConversation_id: friendConversationId,
                    createdAt: Date.now()
                } );
            }
            // console.log( "Hii from footer" )
            // const { data } = await instance.post( '/message', {
            //     textmessage: message,
            //     file: [],
            //     name: localStorage.getItem( 'userName' ),
            //     receiver_id: id,
            //     sender_id: localStorage.getItem( 'id' ),
            //     friendsAndConversation_id: friendConversationId,
            //     createdAt: Date.now()
            // } )
            // console.log( "This is message data", data )
            setMessage( '' );
        } catch ( err ) {
            console.log( err )
        }
    };

    return (
        <div className="bg-gray-100 p-4 relative" >
            <form onSubmit={ handleSendMessage } className="flex">
                <input
                    type="text"
                    placeholder="Write message"
                    value={ message }
                    onChange={ ( e ) => setMessage( e.target.value ) }
                    className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    SEND
                </button>
            </form>
        </div>
    );
};

export default ChatFooter;
