import { useEffect, useState } from 'react';
import instance from '../../axios/instance.jsx';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../actions/userSlices.js';

const UserList = ( { socket } ) => {
    const [ users, setUsers ] = useState( [] );
    const [ active, setActive ] = useState( [] )
    const [ isConnected, setIsConnected ] = useState( true )
    const [ check, setCheck ] = useState( true );

    useEffect( () => {

        socket.on( 'receiverRequest', ( receiver_id ) => {
            console.log( "Receiver Id ", receiver_id )
            const userResponse = window.confirm( `You have a new request` )
            const newStatus = userResponse ? 'accept' : 'reject'
            console.log( newStatus )
            setStatus( newStatus )
            socket.emit( 'respondToRequest', { sender_id, id, status: newStatus } )
        } )
    }, [] )

    useEffect( () => {
        async function getAllUsers() {
            try {

                const { data: { data } } = await instance.get( '/user' );
                console.log( "All User data : ", data );
                setUsers( data ); // Set the users directly to the response data

            } catch ( error ) {
                console.error( 'Error fetching users:', error );
            }
        }
        getAllUsers()
    }, [] );

    useEffect( () => {
        async function getAllActiveUsers() {
            try {
                const { data } = await instance.get( '/active-users' )
                console.log( "Active User data ", data.activeUsers )
                setActive( data.activeUsers )
            } catch ( err ) {
                console.log( err )
            }
        }
        getAllActiveUsers()
        return () => { socket.emit( "check", { check } ) }
    }, [] )




    return (
        <div className='bg-gray-100 min-h-screen p-4'>
            <h1 className='text-2xl font-bold mb-4'>User List</h1>
            <ul className='space-y-2'>
                { users.map( ( user ) => (
                    <li key={ user._id } className='bg-white p-4 rounded shadow flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button className='text-green-500 hover:text-green-700 mr-2'><Link to={ `/users/${ user.id }` }>+</Link></button>
                            <p>{ user.name }</p>
                        </div>
                    </li>
                ) ) }
                <h2>Active Users</h2>
                { active.map( ( user ) => (
                    <li key={ user._id } className='bg-white p-4 rounded shadow flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button className='text-green-500 hover:text-green-700 mr-2'><Link to={ `/users/${ user.id }` }>+</Link></button>
                            <p>{ user.name }</p>
                        </div>
                    </li>
                ) ) }
            </ul>



        </div >
    );
};




export default UserList