import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { X, Mic, Image } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import Comment from './Comment';

const PURGOMALUM_API_URL = 'https://www.purgomalum.com/service/containsprofanity';

const CommentDialog = ({ open, setOpen, postId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null); 
  const [userProfile, setUserProfile] = useState(null); 

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://hola-project.onrender.com/api/posts/${postId}/comments/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setComments(res.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching comments.");
    }
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(`https://hola-project.onrender.com/api/posts/${postId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPost(res.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching the post.");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('https://hola-project.onrender.com/api/accounts/profile/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setUserProfile(res.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching the user profile.");
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
      fetchPost();
      fetchUserProfile();
    }
  }, [open, postId]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {
    if (!text.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    // Check for abusive content using PurgoMalum API
    try {
      const purgoMalumResponse = await axios.get(PURGOMALUM_API_URL, {
        params: {
          text
        }
      });

      console.log('PurgoMalum Response:', purgoMalumResponse.data);

      if (purgoMalumResponse.data === 'true') {
        toast.error("Your comment was detected as abusive and cannot be posted.");
        return;
      }
    } catch (error) {
      console.error('Error checking comment with PurgoMalum API:', error);
      toast.error("An error occurred while checking the comment for abusive content.");
      return;
    }

    try {
      const res = await axios.post(`https://hola-project.onrender.com/api/posts/${postId}/comments/`, { content: text }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (res.status === 201) {
        const updatedComments = [...comments, res.data];
        setComments(updatedComments);
        toast.success("Comment added successfully!");
        setText("");
        fetchPost(); 
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the comment.");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const addReply = (reply) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === reply.parent_comment) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      });
      return updatedComments;
    });
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.delete(`https://hola-project.onrender.com/api/posts/comments/${commentId}/delete/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        toast.success("Comment deleted successfully!");
        fetchPost();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the comment.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="flex flex-col items-center justify-start max-h-[85vh] overflow-y-hidden bg-[#343434] text-white rounded-2xl w-90 md:w-2/4 lg:w-2/3 mx-1 sm:mx-auto sm:max-w-md">
        <div className='w-full p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Comment</h2>
            <button onClick={() => setOpen(false)} className='text-white'>
              <X size={24} />
            </button>
          </div>
          <div className='flex items-center mb-4'>
            <Link to={`/profile/${post?.created_by?._id}`} className='font-semibold text-xs'>{post?.created_by?.username}</Link>
          </div>
          <input
            type="text"
            value={text}
            onChange={changeEventHandler}
            onKeyPress={handleKeyPress}
            placeholder='Add a comment...'
            className='flex-grow outline-none border-none text-sm bg-[#101010] text-white p-2 rounded'
          />
          <Mic className='text-white cursor-pointer' size={20} />
          <Image className='text-white cursor-pointer' size={20} />
        </div>
        <div className='flex gap-2 mt-2 overflow-x-auto'>
          <span role="img" aria-label="emoji" className='cursor-pointer'>😊</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>😂</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>😍</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>😢</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>😎</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>😡</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>👍</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>👎</span>
          <span role="img" aria-label="emoji" className='cursor-pointer'>🙏</span>
          {/* <span role="img" aria-label="emoji" className='cursor-pointer'>💪</span> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;