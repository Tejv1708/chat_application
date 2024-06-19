import React, { useState } from 'react';

const ChatFooter = ( { socket } ) => {
    const [ message, setMessage ] = useState( '' );
    const [ files, setFiles ] = useState( [] )

    const handleFileChanges = ( e ) => {
        const seletedFiles = Array.from( e.target.files );
    }

    // const handleUpload = async ( e ) => {
    //     e.preventDefault()

    //     try {
    //         const formData = new FormData()
    //         files.forEach( ( file, index ) => {
    //             formData.append( `images-${ index }`, file )
    //         } )

    //         const response = await axios.post( '/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         } )
    //     } catch ( err ) {
    //         console.log( 'Error from image uploading :', err )
    //     }
    // }
    const handleSendMessage = ( e ) => {
        e.preventDefault();
        if ( message.trim() && localStorage.getItem( 'userName' ) ) {
            socket.emit( 'message', {
                text: message,
                name: localStorage.getItem( 'userName' ),
                id: `${ socket.id }${ Math.random() }`,
                socketID: socket.id,
                createdAt: Date.now()
            } );
        }
        setMessage( '' );
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
