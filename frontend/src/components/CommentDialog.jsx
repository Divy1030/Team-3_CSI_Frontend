import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { X, Mic, Image, Heart, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/redux/postSlice';
import DragCloseDrawer from './DragCloseDrawer';

const CommentDialog = ({ open, setOpen, postId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [parentCommentId, setParentCommentId] = useState(null); // Track the parent comment ID for replies
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
    setText(e.target.value);
  };

  const sendMessageHandler = async () => {
    if (!text.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    const requestBody = {
      content: text,
    };

    if (parentCommentId) {
      requestBody.parent_comment = parentCommentId;
    }

    try {
      const res = await axios.post(`https://hola-project.onrender.com/api/posts/${postId}/comments/`, requestBody, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (res.status === 201) {
        const updatedComments = [...comments, res.data];
        setComments(updatedComments);
        toast.success("Comment added successfully!");
        setText("");
        setParentCommentId(null); // Reset parent comment ID after sending the reply
        fetchPost();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the comment.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const addReply = (commentId) => {
    setParentCommentId(commentId); // Set the parent comment ID when replying to a comment
    setText(`@${comments.find(comment => comment.id === commentId).user.username} `); // Pre-fill the input with the username
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

  const likeComment = async (commentId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.post(`https://hola-project.onrender.com/api/posts/comments/${commentId}/like/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        toast.success("Comment liked successfully!");
        // Update the comment state
        setComments(comments.map(comment => 
          comment.id === commentId ? { ...comment, is_liked: true, likes_count: (comment.likes_count || 0) + 1 } : comment
        ));
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while liking the comment.");
    }
  };

  const unlikeComment = async (commentId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.delete(`https://hola-project.onrender.com/api/posts/comments/${commentId}/unlike/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        toast.success("Comment unliked successfully!");
        // Update the comment state
        setComments(comments.map(comment => 
          comment.id === commentId ? { ...comment, is_liked: false, likes_count: (comment.likes_count || 1) - 1 } : comment
        ));
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while unliking the comment.");
    }
  };

  const toggleLikeComment = async (comment) => {
    if (comment.is_liked) {
      await unlikeComment(comment.id);
    } else {
      await likeComment(comment.id);
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {isMobile ? (
        <DragCloseDrawer open={open} setOpen={setOpen}>
          <div className='flex flex-1 flex-col md:flex-row'>
            <div className='w-full md:w-1/2 border-none hidden md:flex'>
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
              <div className='flex-1 overflow-y-auto max-h-96 p-4 pb-20 hide-scrollbar border-none'>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} postId={postId} addReply={addReply} deleteComment={deleteComment} toggleLikeComment={toggleLikeComment} />
                ))}
              </div>
              <div className='p-4 bg-[#101010] fixed bottom-0 left-0 w-full md:relative md:bottom-auto md:left-auto'>
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
                  <Send onClick={sendMessageHandler} className='text-white cursor-pointer' size={20} />
                </div>
              </div>
            </div>
          </div>
        </DragCloseDrawer>
      ) : (
        <Dialog open={open}>
          <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col bg-[#252525] text-white border-none">
            <DialogTitle className="sr-only">Comments</DialogTitle>
            <div className='flex items-center justify-between p-4 bg-[#101010]'>
              <h2 className='text-lg font-bold'>Comment</h2>
              <button onClick={() => setOpen(false)} className='text-white'>
                <X size={24} />
              </button>
            </div>
            <div className='flex flex-1 flex-col md:flex-row'>
              <div className='w-full md:w-1/2 border-none hidden md:flex'>
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
                <div className='flex-1 overflow-y-auto max-h-96 p-4 pb-20 hide-scrollbar border-none'>
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} postId={postId} addReply={addReply} deleteComment={deleteComment} toggleLikeComment={toggleLikeComment} />
                  ))}
                </div>
                <div className='p-4 bg-[#101010] fixed bottom-0 left-0 w-full md:relative md:bottom-auto md:left-auto'>
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
                    <Send onClick={sendMessageHandler} className='text-white cursor-pointer' size={20} />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CommentDialog;