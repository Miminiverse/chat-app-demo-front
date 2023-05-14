// import { FcGoogle } from 'react-icons/fc';
import {useState, useContext, useEffect, useRef} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import axios from "axios"
import {v4 as uuidv4} from "uuid" 

interface Messages {
    fromSelf: boolean,
    message: string,
}



const ChatContainer = ({currentUser, currentChat, socket}) => {

    const [messages, setMessages] = useState<Messages[]>([])
    const [arrivalMessages, setArrivalMessages] = useState<null>(null)
    const scrollRef = useRef()

    
    const addMsgUrl = "http://localhost:5052/api/messages/add"
    const getMsgUrl = "http://localhost:5052/api/messages/get"


    async function handleGetMessages () {
        const data = await axios.post(getMsgUrl, {
            from: currentUser.user.userId,
            to: currentChat._id,
        })
        setMessages(data.data)
    }


    useEffect(() => {
        handleGetMessages()
    }, [currentChat])


    const handleSendChat = async (messageText) => {
        await axios.post(addMsgUrl, {
            from: currentUser.user.userId,
            to: currentChat._id,
            message: messageText
        })

        socket.current.emit("send-message", {
            from: currentUser.user.userId,
            to: currentChat._id,
            message: messageText,
        })


        setMessages(prev => [...prev, {
            fromSelf: true, 
            message: messageText, 
        }])
    }


        useEffect(() => {
            if (socket.current) {
                socket.current.on("receive-message", (msg) => {
                    console.log(msg);
                    
                    setArrivalMessages({
                        fromSelf: false,
                        message: msg,
                    })
                })
            }
        }, [])

        useEffect(() => {
            arrivalMessages && setMessages((prev) => [...prev, arrivalMessages])
        }, [arrivalMessages])


        useEffect(() => {
            scrollRef.current?.scrollIntoView({behavior: 'smooth', block:'end'})
        }, [messages])

        console.log(arrivalMessages);
        

        return (
        <>
        <div className="flex-grow">
        <div className="relative h-full">
        <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
            {messages.map((message) => (
                <div key={uuidv4()} className={(message.fromSelf ? 'text-right' : 'text-left')}>
                <div className={"text-left inline-block p-2 m-2 rounded-md text-sm " + (!message.fromSelf? "bg-slate-500" : "bg-white" )}>  
                    {message.message}
                </div>
                </div>
            ))}
        <div ref={scrollRef}></div> 
        </div>
        </div>
        </div>
        <ChatInput onHandleSendChat={handleSendChat}/>

        </>
        )
}

export default ChatContainer