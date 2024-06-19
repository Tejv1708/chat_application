import { X } from "lucide-react";
import { useRef, useState } from "react";
import instance from "../../axios/instance";

function PopUpModel( { onClose } ) {
    const [ sender_id, setSender_id ] = useState( "" );
    const [ receiver_id, setReceiver_id ] = useState( "" );
    const [ loading, setLoading ] = useState( false ); // Track loading state
    const [ showError, setShowError ] = useState( false )
    const [ error, setError ] = useState( {} )
    const modelRef = useRef();

    const handleSubmit = async () => {
        setLoading( true ); // Start loading

        try {
            const Conversation_id = await instance.post( '/create-conversation', {
                sender_id: sender_id,
                receiver_id: receiver_id
            } );

            console.log( "Conversation ID:", Conversation_id );

            // Only update state if component is still mounted
            if ( modelRef.current ) {
                setSender_id( "" );
                setReceiver_id( "" );
                onClose(); // Close the modal
            }
        } catch ( error ) {
            console.error( "Error creating conversation:", error );
            setShowError( true )
            setError( error )
        } finally {
            setLoading( false ); // Stop loading
        }
    };

    const closeModel = ( e ) => {
        if ( modelRef.current === e.target ) {
            onClose();
        }
    };

    return (
        <div
            ref={ modelRef }
            onClick={ closeModel }
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="mt-10 flex flex-col gap-5 text-white">
                <button className="place-self-end" onClick={ onClose }>
                    <X size={ 30 } />
                </button>

                <div className="bg-indigo-600 rounded-xl px-20 py-10 flex-col gap-5 items-center mx-4">
                    <h1 className="text-3xl font-extrabold">
                        You Can Enter Sender ID And Receiver ID
                    </h1>

                    <form onSubmit={ ( e ) => { e.preventDefault(); handleSubmit(); } }>
                        <label className="flex justify-center font-bold">Sender ID</label>
                        <input
                            placeholder="Enter your Sender ID"
                            required
                            className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                            value={ sender_id }
                            onChange={ ( e ) => setSender_id( e.target.value ) }
                        />
                        <label className="text=xl font-bold flex justify-center">Receiver ID</label>
                        <input
                            placeholder="Enter Your Receiver ID"
                            required
                            className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
                            value={ receiver_id }
                            onChange={ ( e ) => setReceiver_id( e.target.value ) }
                        />
                        <button
                            type="submit"
                            disabled={ loading }
                            className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-black"
                        >
                            { loading ? 'Submitting...' : 'Submit' }
                        </button>
                    </form>
                    { showError && error.response.data }
                </div>
            </div>
        </div>
    );
}

export default PopUpModel;
