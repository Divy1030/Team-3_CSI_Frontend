import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'; // Import Dialog components
import { FiMapPin } from 'react-icons/fi'; // Import FiMapPin icon
import axios from 'axios';

const CreatePostStep2 = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imagePreview, file } = location.state || {};
  const [locationInput, setLocationInput] = useState(""); // Add state for location input
  const [hashtags, setHashtags] = useState(""); // Add state for hashtags input
  const [hideViewCounts, setHideViewCounts] = useState(false); // Add state for hide view counts
  const [hideLikeCounts, setHideLikeCounts] = useState(false); // Add state for hide like counts
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("location", locationInput); // Append location to form data
    formData.append("hashtags", hashtags); // Append hashtags to form data
    formData.append("hideViewCounts", hideViewCounts); // Append hide view counts to form data
    formData.append("hideLikeCounts", hideLikeCounts); // Append hide like counts to form data
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axios.post('https://instaclone-g9h5.onrender.com/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="flex flex-col items-center justify-start max-h-[80vh] overflow-y-auto bg-[#343434] text-white rounded-2xl">
        <DialogHeader className='text-center font-semibold text-2xl mb-4 text-[#cab2ff] border-none'>Create New Post</DialogHeader>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-center">
            <img src={imagePreview} alt="post preview" className="rounded-md" />
          </div>
          <div>
            <label htmlFor="hashtags" className="block font-medium text-gray-300">
              Add your hashtags
            </label>
            <input
              type="text"
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white"
              placeholder="Enter your hashtags..."
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-medium text-gray-300">
              Add location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter your location..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white pl-4 pr-10"
              />
              <FiMapPin className="absolute right-3 top-3 text-white" />
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="hide-view-counts" className="font-medium text-gray-300 mr-2">
              Hide view counts on this post
            </label>
            <input
              type="checkbox"
              id="hide-view-counts"
              checked={hideViewCounts}
              onChange={(e) => setHideViewCounts(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="hide-like-counts" className="font-medium text-gray-300 mr-2">
              Hide like counts on this post
            </label>
            <input
              type="checkbox"
              id="hide-like-counts"
              checked={hideLikeCounts}
              onChange={(e) => setHideLikeCounts(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <Button onClick={createPostHandler} className='bg-[#0095F6] hover:bg-[#258bcf] mt-4'>
            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostStep2;