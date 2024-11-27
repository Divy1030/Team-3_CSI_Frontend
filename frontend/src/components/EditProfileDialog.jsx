import React, { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';
import Loader from './Loader'; // Import a loader component

const EditProfileDialog = ({ isOpen, onClose }) => {
  const imageRef = useRef();
  const { user } = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false);
  const [profilePhotoLoading, setProfilePhotoLoading] = useState(false);
  const [backgroundPhotoLoading, setBackgroundPhotoLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    backgroundPhoto: user?.backgroundPhoto,
    bio: user?.bio,
  });
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const backgroundFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, backgroundPhoto: file });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append('bio', input.bio);
    if (input.profilePhoto) formData.append('profile_photo', input.profilePhoto);
    if (input.backgroundPhoto) formData.append('background_photo', input.backgroundPhoto);

    try {
      setLoading(true);
      setProfilePhotoLoading(true);
      setBackgroundPhotoLoading(true);
      const res = await axios.put('https://hola-project.onrender.com/api/accounts/profile/edit/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        const updatedUserData = {
          ...user,
          bio: res.data.bio,
          profilePicture: res.data.profile_photo,
          backgroundPhoto: res.data.background_photo
        };
        dispatch(setAuthUser(updatedUserData));
        toast.success("Profile updated successfully!");
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile.");
    } finally {
      setLoading(false);
      setProfilePhotoLoading(false);
      setBackgroundPhotoLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-[#2a2a2b] bg-opacity-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2b] text-white p-4 w-full max-w-2xl mx-auto h-auto overflow-y-auto rounded-lg">
        <div className="relative">
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-white">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <section className='flex flex-col gap-6 w-full my-8'>
            <h1 className='font-bold text-xl'>Edit Profile</h1>
            <div className='flex items-center justify-between bg-gray-800 rounded-xl p-4'>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className='font-bold text-sm'>{user?.username}</h1>
                  <span className='text-gray-400'>{user?.bio || 'Bio here...'}</span>
                </div>
              </div>
              <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' />
              <Button onClick={() => imageRef?.current.click()} className='bg-[#9085b6] h-8 hover:bg-[#7a6a9e]'>Change photo</Button>
            </div>
            <div>
              <h1 className='font-bold text-xl mb-2'>Bio</h1>
              <Textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' className="focus-visible:ring-transparent bg-[#1e2837] text-white border-2 border-[#9085b6]" />
            </div>
            <div>
              <h1 className='font-bold text-xl mb-2'>Background Photo</h1>
              <input ref={imageRef} onChange={backgroundFileChangeHandler} type='file' className='hidden' />
              <Button onClick={() => imageRef?.current.click()} className='bg-[#9085b6] h-8 hover:bg-[#7a6a9e]'>Change background photo</Button>
              {backgroundPhotoLoading && <Loader />} {/* Conditionally render loader */}
            </div>
            <div className='flex justify-end'>
              {
                loading ? (
                  <Button className='w-fit bg-[#9085b6] hover:bg-[#7a6a9e]'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                  </Button>
                ) : (
                  <Button onClick={editProfileHandler} className='w-fit bg-[#9085b6] hover:bg-[#7a6a9e]'>Submit</Button>
                )
              }
            </div>
          </section>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditProfileDialog;