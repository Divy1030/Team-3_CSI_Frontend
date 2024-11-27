import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';
import Navbar from './Navbar'; // Import the Navbar component

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`https://instaclone-g9h5.onrender.com/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    }, [dispatch]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar /> {/* Add the Navbar component */}
            <div className="flex flex-1 bg-gray-900 text-white overflow-hidden">
                <div className="flex flex-1 overflow-hidden">
                    {/* Chat List */}
                    <div className="w-1/4 bg-gray-800 p-4 overflow-hidden">
                        <h2 className="text-lg font-semibold mb-4">Chats</h2>
                        <div className="space-y-4">
                            {suggestedUsers.map((suggestedUser) => {
                                const isOnline = onlineUsers.includes(suggestedUser?._id);
                                return (
                                    <div
                                        key={suggestedUser._id}
                                        onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
                                    >
                                        <Avatar className='w-12 h-12'>
                                            <AvatarImage src={suggestedUser?.profilePicture} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{suggestedUser?.username}</p>
                                            <p className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                                                {isOnline ? 'online' : 'offline'}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="flex flex-col flex-1 overflow-hidden">
                        {selectedUser ? (
                            <>
                                {/* Header inside Chat Window */}
                                <div className="flex items-center justify-between bg-gray-800 p-4 border-b border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <Avatar className='w-12 h-12'>
                                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="text-lg font-semibold">{selectedUser?.username}</h2>
                                            <p className="text-sm text-gray-400">Where should we go tomorrow?</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button className="p-2 rounded-full hover:bg-gray-700">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button className="p-2 rounded-full hover:bg-gray-700">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-6 bg-chat-pattern bg-cover">
                                    <div className="space-y-4">
                                        {messages && messages.map((msg) => (
                                            <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-xs p-3 rounded-lg text-sm ${msg.senderId === user?._id ? 'bg-purple-600' : 'bg-gray-700'}`}>
                                                    {msg.message}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Chat Input */}
                                <div className="bg-gray-800 p-4 border-t border-gray-700 flex items-center gap-3">
                                    <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                                        <i className="fas fa-paperclip"></i>
                                    </button>
                                    <Input
                                        value={textMessage}
                                        onChange={(e) => setTextMessage(e.target.value)}
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 bg-gray-700 p-2 rounded-lg text-sm text-gray-300 outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    <Button onClick={() => sendMessageHandler(selectedUser?._id)} className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-500">
                                        <i className="fas fa-paper-plane"></i>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className='flex flex-col items-center justify-center mx-auto'>
                                <MessageCircleCode className='w-32 h-32 my-4' />
                                <h1 className='font-medium'>Your messages</h1>
                                <span>Send a message to start a chat.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;