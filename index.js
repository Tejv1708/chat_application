import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { createServer } from 'http'
import userRouter from './Routes/userRoutes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors'
import Message from './model/messageSchema.js';
import router from './Routes/messageRoutes.js';
import conversationRoute from './Routes/FriendConversationRoute.js'
import FriendConversation from './model/FriendConversationId.js';
import 'dotenv/config'
import AppError from './utils/AppError.js';
import { globalErrorHandler } from './controller/errorContoller.js';


const app = express();
const server = createServer( app )
//Instance of the socket.io 
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );
const io = new Server( server );


app.use( express.urlencoded( { extended: true } ) );
app.use( cors() )
app.use( '/uploads', express.static( path.join( __dirname, 'uploads' ) ) )
app.use( express.json() );
app.use( '/message', router )
app.use( '/user', userRouter )
app.use( '/create-conversation', conversationRoute )

app.use( express.json() );

app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
} );

server.listen( 3000, () => console.log( 'Server is running on PORT 3000' ) )

mongoose.connect( process.env.MONGO_URL )
    .then( () => {
        console.log( 'Connected to MongoDB' );
    } )
    .catch( ( error ) => {
        console.error( 'Error connecting to MongoDB:', error.message );
    } );


// Socket.io connection
let activeUsers = [];
io.on( 'connection', ( socket ) => {

    socket.on( 'new-user-added', ( newUserId ) => {
        console.log( newUserId );
        if ( !activeUsers.some( ( user ) => user.userId === newUserId.data._id ) ) {
            activeUsers.push( { name: newUserId.data.name, userId: newUserId.data._id, socketId: socket.id } )

        }
        io.emit( "get-users", activeUsers )
    } )

    console.log( activeUsers )
    socket.on( 'send-req', ( data ) => {
        const { sender_id, receiver_id } = { data }
        console.log( sender_id, receiver_id )
    } )

    // io.on("connection", (socket) => {
    //     socket.on( "say to someone", ( id, msg ) => {
    //         // send a private message to the socket with the given id
    //         socket.to( id ).emit( "my message", msg );
    //     } );
    // } );

    socket.on( 'message', async ( msg ) => {

        console.log( msg );
        io.emit( 'messageResponse', msg )
        const newMessage = new Message( msg );
        await newMessage.save();
    } )

    // socket.on( 'send-friend-request', async ( data ) => {
    //     try {
    //         const { sender_id, receiver_id } = data
    //         const friendsAndConversation = new FriendConversation( { sender_id: sender_id, receiver_id: receiver_id } )
    //         await friendsAndConversation.save()

    //         const receiverSocket_id = 
    //     } catch ( err ) {
    //         console.log( err )
    //     }
    // } )



    // Handle disconnection
    socket.on( 'disconnect', () => {
        activeUsers = activeUsers.filter( ( user ) => user.socketId !== socket.id )
        console.log( `User disconnected: ${ socket.id }` );
        io.emit( "get-users", activeUsers )
    } );


    socket.on( "offline", () => {
        // remove user from active users 
        activeUsers = activeUsers.filter( ( users ) => users.socketId !== socket.id )
    } )
} );


