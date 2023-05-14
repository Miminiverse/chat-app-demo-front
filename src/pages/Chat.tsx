// import { FcGoogle } from 'react-icons/fc';
import {useState, useContext, useEffect, useRef} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import Contact from '../components/Contact';
import ChatContainer from '../components/ChatContainer'
import { io, Socket } from 'socket.io-client';

interface User {
    token: string,
    user: {
        username: string;
        userId: number; 
    }
}

interface Contact {
    email: string,
    username: string,
    _id: number
}

type MyEventMap = {
    connect: () => void;
    disconnect: () => void;
    hello: (message: string) => void;
    "add-user": (userID: number, username: string) => void
  };


const Chat = () => {
    const url = "http://localhost:5052/api/auth/allusers"
    const socket = useRef<Socket<MyEventMap> | null>()
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
    const [selectedUser, setSelectedUser] = useState<null | number>(null)
    const [contacts, setContacts] = useState<Contact[]>([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const navigate = useNavigate()


    useEffect (() => {
        if (currentUser) {
            socket.current = io("http://localhost:5052")
            socket.current.emit("add-user", currentUser.user.userId, currentUser.user.username)
        } 

    }, [currentUser])
    
    if (socket.current && socket.current.connected) {
        console.log('Socket is connected');
      } else {
        console.log('Socket is not connected');
      }


    
    useEffect(() => {
        checkCurrentUser()
    }, [])

    useEffect(() => {
        getAllUsers()
      }, [currentUser])

    async function checkCurrentUser(): Promise<void>{
        if (!localStorage.getItem('chat-app-current-user')) {
            navigate("/")
        } else {
            const user: User | null = await JSON.parse(localStorage.getItem('chat-app-current-user') || 'null')
            if (user) {
                setCurrentUser(user)
            }
        }
    }

    
    
    async function getAllUsers(): Promise<void> {
        if (currentUser?.user) {
            const {data} = await axios.get(`${url}/${currentUser.user.userId}`)
        setContacts(data)
    }}


    const handleClick = (contact) => {
        setSelectedUser(contact._id)
        setCurrentChat(contact)
    }

        return (
        <>
        <div className="flex h-screen ">
            <div className="bg-gray-100 w-1/3 p-2 "> 
            <div 

            className="flex text-gray font-bold gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
                Chat App

            </div>
            {contacts.map((contact) => (
                <div 
                key={contact._id}
                className={'border-b border-gray-100 py-2 cursor-pointer text-center '}
                onClick={() => handleClick(contact)}
                >
                    {contact.username}
                </div>
            ))}
            </div>
            <div className=" flex flex-col bg-gray-300 w-2/3 p-2"> 

                {currentChat === undefined ? (<div>Select a person</div>) 
                : 
                (<ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket}/>)
                }

            </div>

        </div>
        </>
        )
}

export default Chat