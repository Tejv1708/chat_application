import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../axios/instance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';

const Home = ( { socket } ) => {

    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ passwordConfirm, setPasswordConfirm ] = useState( '' );

    const navigate = useNavigate();


    const handleSubmit = async ( e ) => {
        e.preventDefault();

        try {
            const { data: { data } } = await instance.post( 'user', {
                name,
                email,
                password,
                passwordConfirm,
            } );
            console.log( data._id );
            socket.emit( 'new-user-added', {
                data
            } )
            localStorage.setItem( 'activeUser', name )
            localStorage.setItem( 'id', data._id )
            navigate( '/users', { state: data._id } ); // Redirect to the chat page after signing in
        } catch ( error ) {
            console.log( error );
        }

    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Sign In To Open Chat</h2>

                <form onSubmit={ handleSubmit }>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={ name }
                            onChange={ ( e ) => setName( e.target.value ) }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={ email }
                            onChange={ ( e ) => setEmail( e.target.value ) }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={ password }
                            onChange={ ( e ) => setPassword( e.target.value ) }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passwordConfirm" className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={ passwordConfirm }
                            onChange={ ( e ) => setPasswordConfirm( e.target.value ) }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;



