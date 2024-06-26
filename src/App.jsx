import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client'
import instance from './axios/instance'
import Home from './components/pages/Home'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import ChatPage from './components/pages/ChatPage.jsx'
import UserList from './components/Users/UserList.jsx'
import SingleUser from './components/Users/SingleUser.jsx'


function App() {
  const socket = io( 'http://localhost:3000/', { transports: [ 'websocket' ] } )
  //"667283edf463a4e0879bba0b"
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={ <Home socket={ socket } /> }></Route>
            <Route path='/users' element={ <UserList socket={ socket } /> } >
            </Route>
            <Route path='/users/:id' element={ <SingleUser socket={ socket } /> } >

            </Route>
            <Route path='/users/:id/:friendConversationId' element={ <ChatPage socket={ socket } /> }>
            </Route>
          </Routes>
        </div>
      </BrowserRouter >
    </>
  )
}

export default App
