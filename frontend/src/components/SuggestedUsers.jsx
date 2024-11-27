import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockSuggestions } from '../redux/mockData';
import { FaUserPlus } from 'react-icons/fa'; // Import the FaUserPlus icon

const SuggestedUsers = () => {
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-white'>Add friends</h1> {/* Change text color to white */}
                <span className='font-medium cursor-pointer text-white'>See All</span> {/* Change text color to white */}
            </div>
            {
                mockSuggestions.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm text-white'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1> {/* Change text color to white */}
                                </div>
                            </div>
                            <FaUserPlus className='text-[#cab3fe] text-lg cursor-pointer hover:text-[#3495d6]' /> {/* Replace Follow text with icon */}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default SuggestedUsers;