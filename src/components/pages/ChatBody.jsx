import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import ChatFooter from './ChatFooter';
import { data } from 'autoprefixer';

const ChatBody = ( { messages, user } ) => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState( false );
    const [ page, setPage ] = useState( 1 );
    const [ chatMessages, setChatMessages ] = useState( [] );
    const [ username, setUserName ] = useState( localStorage.getItem( "userName" ) )
    const observer = useRef( null );
    const lastMessageRef = useRef( null );

    useEffect( () => {
        setChatMessages( messages );
    }, [ messages ] );

    useEffect( () => {
        const fetchMoreMessages = async () => {
            try {
                setIsLoading( true );
                const { data } = await instance.get( `?page=${ page }` );
                setChatMessages( prevMessages => [ ...prevMessages, ...data ] );
                setIsLoading( false );
            } catch ( error ) {
                console.error( 'Error fetching more messages:', error );
                setIsLoading( false );
            }
        };

        if ( observer.current && !isLoading ) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver( entries => {
            if ( entries[ 0 ].isIntersecting ) {
                setPage( prevPage => prevPage + 1 );
            }
        } );

        if ( lastMessageRef.current ) {
            observer.current.observe( lastMessageRef.current );
        }

        return () => {
            if ( observer.current ) {
                observer.current.disconnect();
            }
        };
    }, [ page, isLoading ] );

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
                        { chatMessages && chatMessages.map( ( data, index ) => (
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
                                    <p>{ data.text }</p>
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

