import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal, X, Mic, Image } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/redux/postSlice';

const PURGOMALUM_API_URL = 'https://www.purgomalum.com/service/containsprofanity';

const CommentDialog = ({ open, setOpen, postId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null); 
  const [userProfile, setUserProfile] = useState(null); 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 

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
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col bg-[#252525] text-white border-none">
        <div className='flex items-center justify-between p-4 bg-[#101010]'>
          <h2 className='text-lg font-bold'>Comment</h2>
          <button onClick={() => setOpen(false)} className='text-white'>
            <X size={24} />
          </button>
        </div>
        <div className='flex flex-1 flex-col md:flex-row'>
          <div className='w-full md:w-1/2 border-none'>
            {post && post.media && (
              <img
                src={`https://hola-project.onrender.com${post.media}`}
                alt="post_img"
                className='w-full h-64 md:h-[500px] object-cover rounded-l-lg'
              />
            )}
          </div>
          <div className='w-full md:w-1/2 flex flex-col justify-between border-none'>
            <hr className='hidden md:block' />
            <div className='flex-1 overflow-y-auto max-h-96 p-4 hide-scrollbar border-none'>
              {
                comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} postId={postId} addReply={addReply} deleteComment={deleteComment} />
                ))
              }
            </div>
            <div className='p-4 bg-[#101010]'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-3 items-center'>
                  <Link to={`/profile/${post?.created_by?._id}`}>
                    <Avatar>
                      <AvatarImage src={`https://hola-project.onrender.com${userProfile?.profile_photo}`} />
                      <AvatarFallback>{post?.created_by?.username?.[0]}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link to={`/profile/${post?.created_by?._id}`} className='font-semibold text-xs'>{post?.created_by?.username}</Link>
                  </div>
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
                <span role="img" aria-label="emoji" className='cursor-pointer'>💪</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog;