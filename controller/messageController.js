import FriendConversation from "../model/FriendConversationId.js";
import Message from "../model/messageSchema.js";
import catchAsync from '../utils/catchAsync.js'


export const createMessage = async ( req, res, next ) => {

    try {

        const { sender_id, friendsAndConversation_id, textmessage } = req.body;
        console.log( req.body )
        // This is how we handle the multiple files
        const fileData = req.files ? req.files.map( file => file.path ) : [];

        const checkFriendID = await FriendConversation.findById( friendsAndConversation_id ).populate( 'sender_id' )
        console.log( checkFriendID )
        const ref_receiver_id = checkFriendID.receiver_id.toString()

        // Convert ObjectId to string
        const ref_sender_id = checkFriendID.sender_id._id.toString();

        console.log( sender_id === ref_sender_id );
        console.log( sender_id === ref_receiver_id );
        console.log( !( sender_id === ref_sender_id ) || !( sender_id === ref_receiver_id ) );




        // Compare sender_id and ref_sender_id
        if ( !( ( sender_id === ref_sender_id ) || ( sender_id === ref_receiver_id ) ) ) {
            return res.status( 404 ).json( {
                message: 'FriendConversation ID is not generated. Please first create the FriendConversation ID'
            } );
        }


        const newMessage = new Message( {
            friendsAndConversation_id: friendsAndConversation_id,
            sender_id: sender_id,
            message: {
                textmessage: textmessage,
                file: fileData
            }
        } );

        const savedMessage = await newMessage.save();

        res.status( 201 ).json( {
            data: savedMessage,
            status: 'Message created successfully'
        } );

    } catch ( error ) {
        res.status( 500 ).json( { error: error.message } )
    }
}


// export const data = async ( req, res, next ) => {

//     try {

//         const { sender_id, friendsAndConversation_id, textmessage } = req.body;

//         // This is how we handle the multiple files
//         // const fileData = req.files ? req.files.map( file => file.path ) : [];

//         const checkFriendID = await FriendConversation.findOne( { _id: friendsAndConversation_id } ).populate( 'sender_id' )
//         console.log( "------------", checkFriendID )
//         const ref_receiver_id = checkFriendID.receiver_id.toString()

//         // // Convert ObjectId to string
//         const ref_sender_id = checkFriendID.sender_id._id.toString();

//         // console.log( sender_id === ref_sender_id );
//         // console.log( sender_id === ref_receiver_id );
//         // console.log( !( sender_id === ref_sender_id ) || !( sender_id === ref_receiver_id ) );




//         // Compare sender_id and ref_sender_id
//         if ( !( ( sender_id === ref_sender_id ) || ( sender_id === ref_receiver_id ) ) ) {
//             return res.status( 404 ).json( {
//                 message: 'FriendConversation ID is not generated. Please first create the FriendConversation ID'
//             } );
//         }


//         const newMessage = new Message( {
//             friendsAndConversation_id: friendsAndConversation_id,
//             sender_id: sender_id,
//             message: {
//                 textmessage: textmessage,
//                 file: fileData
//             }
//         } );

//         const savedMessage = await newMessage.save();

//         res.status( 201 ).json( {
//             data: savedMessage,
//             status: 'Message created successfully'
//         } );

//     } catch ( error ) {
//         res.status( 500 ).json( { error: error.message } )
//     }
// }




export const getMessage = async ( req, res ) => {
    try {
        const messages = await Message.find();
        res.status( 200 ).json( messages )
    } catch ( error ) {
        res.status( 500 ).json( { error: error.message } )
    }
}


export const deleteMessage = async ( req, res ) => {
    try {
        await Message.deleteMany()
        res.status( 204 ).json( {
            message: "data successfully deleted "
        } )
    } catch ( err ) {
        console.log( err )
    }
}
