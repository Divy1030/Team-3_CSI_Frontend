import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MoreHorizontal } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Comment = ({ comment, postId, addReply, deleteComment }) => {
  const [liked, setLiked] = useState(comment.liked || false);
  const [likesCount, setLikesCount] = useState(comment.likes_count || 0);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    setLiked(comment.liked || false);
    setLikesCount(comment.likes_count || 0);
  }, [comment]);

  const likeCommentHandler = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.post(`https://hola-project.onrender.com/api/posts/comments/${comment.id}/like/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        setLiked(true);
        setLikesCount(likesCount + 1);
        toast.success("Comment liked successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while liking the comment.");
    }
  };

  const unlikeCommentHandler = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.delete(`https://hola-project.onrender.com/api/posts/comments/${comment.id}/unlike/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        setLiked(false);
        setLikesCount(likesCount - 1);
        toast.success("Comment unliked successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while unliking the comment.");
    }
  };

  const replyCommentHandler = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.post(`https://hola-project.onrender.com/api/posts/${postId}/comments/`, {
        content: replyText,
        parent_comment: comment.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 201) {
        addReply(res.data);
        toast.success("Reply added successfully!");
        setReplyText('');
        setShowReplyInput(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while replying to the comment.");
    }
  };

  const deleteCommentHandler = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.delete(`https://hola-project.onrender.com/api/posts/comments/${comment.id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        deleteComment(comment.id);
        toast.success("Comment deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the comment.");
    }
  };

  return (
    <div className='flex flex-col gap-2 my-2'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={`https://hola-project.onrender.com${comment.user?.profilePicture}`} />
            <AvatarFallback>{comment.user?.username?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-bold'>{comment.user?.username}</p>
            <p className='text-sm'>{comment.content}</p>
          </div>
        </div>
        <div className='relative'>
          <Popover>
            <PopoverTrigger asChild>
              <Button className='p-1 bg-transparent text-white opacity-0 hover:opacity-100'>
                <MoreHorizontal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='bg-[#2b2b2b] text-white border-none'>
              <div className='flex flex-col text-left'>
                <button onClick={deleteCommentHandler} className='p-2 text-white text-left'>
                  Delete
                </button>
                <button className='p-2 text-white text-left'>
                  Report
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-sm'>{likesCount} likes</p>
        <button onClick={() => setShowReplyInput(!showReplyInput)} className='text-sm text-blue-500'>Reply</button>
        <button onClick={liked ? unlikeCommentHandler : likeCommentHandler} className='text-red-500 ml-auto'>
          {liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </button>
      </div>
      {showReplyInput && (
        <div className='flex items-center gap-2'>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder='Add a reply...'
            className='w-full outline-none border text-black border-gray-300 p-2 rounded'
          />
          <Button disabled={!replyText.trim()} onClick={replyCommentHandler} variant="outline" className='text-black bg-[#baadf2]'>Send</Button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          <button onClick={() => setShowReplies(!showReplies)} className='text-sm text-blue-500'>
            {showReplies ? 'Hide replies' : `View replies (${comment.replies.length})`}
          </button>
          {showReplies && (
            <div className='ml-4'>
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} postId={postId} addReply={addReply} deleteComment={deleteComment} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;