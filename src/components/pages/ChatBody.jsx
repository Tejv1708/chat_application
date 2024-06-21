import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import ChatFooter from './ChatFooter';
import { data } from 'autoprefixer';

const ChatBody = ( { messages, user, friendConversationId, id } ) => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState( false );
    const [ chatMessages, setChatMessages ] = useState( [] );
    const [ username, setUserName ] = useState( localStorage.getItem( "userName" ) )


    // useEffect( () => {
    //     try {
    //         async function getMessage() {
    //             const { data } = await instance.get( `/message/${ friendConversationId }/${ id }` )
    //             setChatMessages( messages );
    //             console.log( "Data from the ChatBody", data )
    //         }
    //         getMessage()
    //     } catch ( err ) {
    //         console.log( err )
    //     }

    // }, [ messages ] );

    // console.log( messages )

    const handleLeaveChat = async () => {
        localStorage.removeItem( 'userName' );
        navigate( '/' );
        window.location.reload();
    };

    // For the Convertion to the string time to time 
    function convertTimestampToTime( timestamp ) {
        const date = new Date( timestamp );
        const hours = String( date.getHours() ).padStart( 2, '0' ); // Get hours (0-23) and pad with leading zero if needed
        const minutes = String( date.getMinutes() ).padStart( 2, '0' ); // Get minutes (0-59) and pad with leading zero if needed
        return `${ hours }:${ minutes }`;
    }
    return (
        <>
            <header className="flex justify-between items-center bg-gray-800 text-white px-4 py-2">
                <p className="text-lg font-semibold">{ username } </p>
                <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white" onClick={ handleLeaveChat }>
                    LEAVE CHAT
                </button>
            </header>

            <div className="flex flex-col h-full">
                {/* This shows messages */ }
                <div className="flex-grow overflow-y-auto p-4">
                    <ul>
                        { messages && messages.map( ( data, index ) => (
                            <li
                                key={ index }
                                ref={ chatMessages.length === index + 1 ? lastMessageRef : null }
                                className={ `mb-2 ${ data.name === localStorage.getItem( 'userName' ) ? 'flex justify-end' : 'flex justify-start'
                                    }` }
                            >
                                <div className={ `${ data.name === localStorage.getItem( 'userName' ) ? 'bg-blue-500 text-white rounded-br-md rounded-bl-md rounded-tl-md px-4 py-2 inline-block' : 'bg-gray-200 text-gray-800 rounded-bl-md rounded-br-md rounded-tr-md px-4 py-2 inline-block'
                                    }` }>
                                    <p className="text-sm font-semibold mr-0">{ data.name }</p>
                                    <p className="text-xs text-gray-400 ">{ convertTimestampToTime( data.createdAt ) }</p>
                                    <p>{ data.message }</p>
                                </div>
                            </li>
                        ) ) }
                    </ul>
                    { isLoading && <p>Loading...</p> }
                </div>

                {/* This is triggered when a user is typing */ }
                {/* <div className="message__status">
                    <p>Someone is typing...</p>
                </div> */}
            </div>

        </>
    );
};

export default ChatBody;

