// import { FcGoogle } from 'react-icons/fc';
import {useState, useContext, useEffect, ChangeEvent} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"



interface onHandleSendChatProps {
    onHandleSendChat: (messageText: string) => void
}

const ChatInput = ({onHandleSendChat}:onHandleSendChatProps): JSX.Element => {


    const [messageText, setMessageText] = useState<string>("")


    const handleSendChat = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        onHandleSendChat(messageText)
        setMessageText("")
    }
    
        return (
        <>
        <div>
        <form className="flex gap-2" onSubmit={handleSendChat}>
                <input 
                className="border flex-grow bg-white rounded-sm p-2"
                type="text"
                placeholder="Type in message here"
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                />
                <button type="submit" className="bg-slate-400 p-2 text-white rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                </button>
            </form>
        </div>
        </>
        )
}

export default ChatInput