import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { readFileAsDataURL } from '@/lib/utils';
import { useDropzone } from 'react-dropzone'; // Import useDropzone
import { FiImage, FiMapPin } from 'react-icons/fi'; // Import FiImage and FiMapPin icons
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [caption, setCaption] = useState("");
  const [locationInput, setLocationInput] = useState(""); // Add state for location input
  const [hashtags, setHashtags] = useState(""); // Add state for hashtags input
  const [hideViewCounts, setHideViewCounts] = useState(false); // Add state for hide view counts
  const [hideLikeCounts, setHideLikeCounts] = useState(false); // Add state for hide like counts
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Manage steps within the same component
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleNextStep = () => {
    setStep(2);
  }

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
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
      <DialogContent onInteractOutside={() => setOpen(false)} className="flex flex-col items-center justify-start max-h-[85vh] overflow-y-hidden bg-[#343434] text-white rounded-2xl w-full md:w-3/4 lg:w-2/3"> {/* Adjust height and remove overflow */}
        <DialogHeader className='text-center font-semibold text-2xl mb-4 text-[#cab2ff] border-none'>Create New Post</DialogHeader>
        {step === 1 && (
          <>
            <hr className="w-full border-[#cab2ff] mb-4" />
            {!imagePreview && (
              <div {...getRootProps()} className="w-full h-32 flex flex-col items-center justify-center mb-4 cursor-pointer">
                <input {...getInputProps()} />
                <div className="relative">
                  <FiImage className="text-[#cab2ff] mb-2" size={54} />
                </div>
                <p className="text-gray-400 text-center">Drag & drop your photos here</p>
              </div>
            )}
            {imagePreview && (
              <div className='w-full max-h-64 flex items-center justify-center mb-4 overflow-hidden'>
                <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
              </div>
            )}
            <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
            <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#cab2ff] hover:bg-[#a655d1] mb-8 text-black'>Select from device</Button>
            {imagePreview && (
              <Button onClick={handleNextStep} className='w-fit mx-auto bg-[#cab2ff] hover:bg-[#a655d1] mb-8 text-black'>Next</Button>
            )}
          </>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-center">
              <img src={imagePreview} alt="preview_img" className="rounded-md max-h-48" /> {/* Adjust image height */}
            </div>
            <div>
              <Textarea
                id="caption"
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#b1a3e5] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white p-2"
                placeholder="Enter your caption..."
              />
            </div>
            <div>
              <input
                type="text"
                id="hashtags"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#b1a3e5] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white p-2"
                placeholder="Enter your hashtags..."
              />
            </div>
            <div className="relative">
              <input
                type="text"
                id="location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter your location..."
                className="mt-1 block w-full rounded-md border border-[#b1a3e5] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white p-2 pl-4 pr-10"
              />
              <FiMapPin className="absolute right-3 top-3 text-white" />
            </div>
            <div className="flex items-center justify-between border border-[#b1a3e5] rounded-md p-2">
              <span className="font-medium text-gray-300">Hide view counts on this post</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideViewCounts}
                  onChange={(e) => setHideViewCounts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#7d7d7d] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#463d79] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#463d79] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#b1a3e5]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border border-[#b1a3e5] rounded-md p-2">
              <span className="font-medium text-gray-300">Hide like counts on this post</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideLikeCounts}
                  onChange={(e) => setHideLikeCounts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#7d7d7d] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#463d79] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#463d79] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#b1a3e5]"></div>
              </label>
            </div>
            <Button onClick={createPostHandler} className='w-fit mx-auto bg-[#cab2ff] hover:bg-[#a655d1] mb-8 text-black'>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'share'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost;