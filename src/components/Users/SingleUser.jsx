import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import instance from '../../axios/instance';
import { Outlet } from 'react-router-dom';
const SingleUser = ( { socket } ) => {
    const { id } = useParams();
    const [ sender_id, setSender_id ] = useState( localStorage.getItem( "id" ) || '' );
    const [ receiver_id, setReceiver_id ] = useState( id || '' );
    const [ loading, setLoading ] = useState( true )
    const [ showError, setShowError ] = useState( false )
    const [ error, setError ] = useState( null )
    const [ data, setData ] = useState( null )
    const navigate = useNavigate();
    const handleConversationId = async () => {

        try {
            const { data } = await instance.post( '/create-conversation', {
                sender_id,
                receiver_id
            } )
            setLoading( false )
            setData( data )
            navigate( `/users/${ id }/${ data.data._id }` )
            console.log( "Data from Create Conversation : ", data )
        } catch ( err ) {
            console.log( err )
            setShowError( true )
            setError( err )
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create Conversation</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Sender ID</label>
                    <input
                        type="text"
                        value={ sender_id }
                        onChange={ ( e ) => setSender_id( e.target.value ) }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Receiver ID</label>
                    <input
                        type="text"
                        value={ receiver_id }
                        onChange={ ( e ) => setReceiver_id( e.target.value ) }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    onClick={ handleConversationId }
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    { loading ? <p> Create</p> : <p>Loading...</p> }
                </button>
                { showError && error.response.data }
            </div>
        </div>
    );
};

export default SingleUser;
