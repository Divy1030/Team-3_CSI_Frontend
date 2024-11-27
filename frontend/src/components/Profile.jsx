import React from 'react';
import Navbar from './Navbar'; 
import LeftSidebar from './LeftSidebar'; 
import RightSidebar from './RightSidebar'; 
import UserProfile from './UserProfile'; 
import './Profile.css';

const Profile = () => {
    return (
        <div className='min-h-screen bg-[#111010] overflow-x-hidden'>
            <Navbar />
            <div className='flex flex-col md:flex-row mt-16'> 
                <div className='w-72'> 
                    <LeftSidebar /> 
                </div>
                <div className='flex-grow p-4 mt-10 md:mt-0 md:ml-4'> 
                    <UserProfile /> 
                </div>
                <div className='w-full md:w-96 mt-10 md:mt-0 md:ml-4 right-sidebar'>
                    <RightSidebar /> 
                </div>
            </div>
        </div>
    );
};

export default Profile;