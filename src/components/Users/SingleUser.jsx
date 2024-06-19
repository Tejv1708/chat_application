import React, { useEffect, useState } from 'react'
import instance from '../../axios/instance'
import { useLocation, useParams } from 'react-router-dom'
import ChatBar from '../pages/ChatBar'
import ChatBody from '../pages/ChatBody'
import ChatFooter from '../pages/ChatFooter'
import { Socket } from 'socket.io-client'

const SingleUser = ( { socket } ) => {

    const [ loading, setIsLoading ] = useState( true )
    const { id } = useParams()
    // console.log( typeof ( id ) )
    // console.log( typeof ( localStorage.getItem( "id" ) ) )
    // console.log( localStorage.getItem( "activeUser" ) )

    async function handleConversationId() {
        await instance.post( '/create-conversation', {
            sender_id: localStorage.get( "id" ),
            receiver_id: id
        } )
    }
    console.log( "sender_id : ", localStorage.getItem( "id" ) )
    console.log( "receiver_id : ", id )


    useEffect( () => {
        async function User() {
            const user = await instance.get( `/user/${ id }` )
            console.log( user )
            setIsLoading( false )
        }
        User()

    }, [] )

    return (

        loading ? (
            <div> Loading..</div >
        ) : (
            <div className="flex h-screen">
                <div className="w-1/4 bg-gray-800 text-white">
                    <ChatBar />
                </div>
                <div className="w-3/4 flex flex-col">
                    <ChatBody />
                    <ChatFooter />
                </div>
            </div>
        )


    )
}

export default SingleUser