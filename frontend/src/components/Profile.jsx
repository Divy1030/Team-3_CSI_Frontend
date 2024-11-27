import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; // Import DropdownMenu components from Radix UI
import Navbar from './Navbar'; // Import the Navbar component
import LeftSidebar from './LeftSidebar'; // Import the LeftSidebar component
import RightSidebar from './RightSidebar'; // Import the RightSidebar component

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='min-h-screen bg-[#111010] text-white'>
      <Navbar /> {/* Add the Navbar component */}
      <div className='flex max-w-7xl mx-auto'>
        <div className='w-56'> {/* Adjust width for different screen sizes */}
          <LeftSidebar /> {/* Add the LeftSidebar component */}
        </div>
        <div className='flex flex-col gap-10 p-8 flex-grow mx-auto w-full md:w-3/4 lg:w-2/3 mr-32 mt-20'> {/* Increase width of profile section */}
          <div className='border-2 border-purple-500 rounded-lg p-6'> {/* Profile box */}
            <div className='grid grid-cols-2'>
              <section className='flex flex-col items-center justify-center'>
                <Avatar className='h-32 w-32'>
                  <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {isLoggedInUserProfile && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8 mt-4'>Profile Settings</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className='bg-white text-black rounded-md shadow-lg'>
                      <DropdownMenu.Item asChild>
                        <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8 w-full'>Edit profile</Button></Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Button variant='secondary' className='hover:bg-gray-200 h-8 w-full'>View archive</Button>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Button variant='secondary' className='hover:bg-gray-200 h-8 w-full'>Ad tools</Button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                )}
              </section>
              <section>
                <div className='flex flex-col gap-5'>
                  <div className='flex items-center gap-2'>
                    <span>{userProfile?.username}</span>
                    {!isLoggedInUserProfile && (
                      isFollowing ? (
                        <>
                          <Button variant='secondary' className='h-8'>Unfollow</Button>
                          <Button variant='secondary' className='h-8'>Message</Button>
                        </>
                      ) : (
                        <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                      )
                    )}
                  </div>
                  <div className='flex items-center gap-4'>
                    <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                    <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                    <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className='border-2 border-purple-500 rounded-lg p-6'> {/* Posts, Reels, Saved, Tags box */}
            <div className='border-t border-t-gray-200'>
              <div className='flex items-center justify-center gap-10 text-sm'>
                <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
                  POSTS
                </span>
                <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
                  SAVED
                </span>
                <span className='py-3 cursor-pointer'>REELS</span>
                <span className='py-3 cursor-pointer'>TAGS</span>
              </div>
              <div className='grid grid-cols-3 gap-1'>
                {
                  displayedPost?.map((post) => {
                    return (
                      <div key={post?._id} className='relative group cursor-pointer'>
                        <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='flex items-center text-white space-x-4'>
                            <button className='flex items-center gap-2 hover:text-gray-300'>
                              <Heart />
                              <span>{post?.likes.length}</span>
                            </button>
                            <button className='flex items-center gap-2 hover:text-gray-300'>
                              <MessageCircle />
                              <span>{post?.comments.length}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className='w-72 mt-16'> {/* Adjust width for different screen sizes */}
          <RightSidebar /> {/* Add the RightSidebar component */}
        </div>
      </div>
    </div>
  )
}

export default Profile;