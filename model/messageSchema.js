
import mongoose from 'mongoose';

const schema = new mongoose.Schema( {
    friendsAndConversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendConversation",
    },
    sender_id: {
        // type: String
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    message: {
        textmessage: {
            type: String
        }, file: {
            type: Array
        }
    }


}, { timestamps: true } )

const messagesmodel = new mongoose.model( "Message", schema )

export default messagesmodel






