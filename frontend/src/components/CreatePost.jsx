import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { readFileAsDataURL } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';
import { FiImage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../redux/axiosInstance';
import imageCompression from 'browser-image-compression'; // Import the image compression library

const CreatePost = ({ open, setOpen, addPost, fetchAllPost }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setFile(compressedFile);
      const dataUrl = await readFileAsDataURL(compressedFile);
      setImagePreview(dataUrl);
    }
  }

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setFile(compressedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp' // Convert to WebP format
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleNextStep = () => {
    setStep(2);
  }

  const createPostHandler = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("is_public", isPublic);
    formData.append("tags", tags.join(','));
    if (file) formData.append("media", file);
    try {
      setLoading(true);
      const res = await axiosInstance.post('/posts/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 201) {
        const newPost = res.data;
        console.log('create post api rsponse',res.data)
        addPost(newPost);
        toast.success("Post created successfully!");
        setOpen(false);
        setContent('');
        setFile('');
        setImagePreview('');
        setTags([]);
        setIsPublic(true);
        fetchAllPost();
        window.location.reload();
      } else {
        toast.success("Post created successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.success("Post created successfully!");
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="flex flex-col items-center justify-start max-h-[85vh] overflow-y-hidden bg-[#343434] text-white rounded-2xl w-80 md:w-2/4 lg:w-2/3 mx-1 sm:mx-auto sm:max-w-md">
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
              <img src={imagePreview} alt="preview_img" className="rounded-md max-h-48" />
            </div>
            <div>
              <Textarea
                id="content"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#b1a3e5] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white p-2"
                placeholder="Enter your content..."
              />
            </div>
            <div>
              <input
                type="text"
                id="tags"
                value={tags.join(',')}
                onChange={(e) => setTags(e.target.value.split(','))}
                className="mt-1 block w-full rounded-md border border-[#b1a3e5] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white p-2"
                placeholder="Enter your tags..."
              />
            </div>
            <div className="flex items-center justify-between border border-[#b1a3e5] rounded-md p-2">
              <span className="font-medium text-gray-300">Private post</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!isPublic}
                  onChange={(e) => setIsPublic(!e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#7d7d7d] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#463d79] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#463d79] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#b1a3e5]"></div>
              </label>
            </div>
            <Button onClick={createPostHandler} className='w-fit mx-auto bg-[#cab2ff] hover:bg-[#a655d1] mb-8 text-black'>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Share'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost;