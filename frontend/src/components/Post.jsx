import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Bookmark, MessageCircle, MoreHorizontal, Send, Trash2, EyeOff, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import CommentDialog from './CommentDialog';
import axios from 'axios';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Post = ({ post, removePost, fetchAllPosts, isExplorePage }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [showComments, setShowComments] = useState(false); 
    const userId = localStorage.getItem('userId');
    const [liked, setLiked] = useState(post.likes?.includes(userId) || false);
    const [postLike, setPostLike] = useState(post.likes_count || 0);
    const [comment, setComment] = useState(post.comments_count || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [bookmarked, setBookmarked] = useState(false); 
    const [shares, setShares] = useState(post.shares || 0);

    const BASE_URL = 'https://hola-project.onrender.com';
    const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dy1a8nyco/';

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }

    const likeOrDislikeHandler = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error("User is not authenticated.");
            return;
        }

        try {
            const action = liked ? 'unlike' : 'like';
            const method = liked ? 'delete' : 'post';
            const url = liked
                ? `${BASE_URL}/api/posts/${post.id}/unlike/`
                : `${BASE_URL}/api/posts/${post.id}/like/`;

            const res = await axios({
                method: method,
                url: url,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Like/Unlike API Response:', res.data); // Log the response from the API

            if (res.status === 201 || res.status === 204) {
                setLiked(!liked);
                setPostLike(liked ? postLike - 1 : postLike + 1);
                toast.success(res.data.message || (liked ? "Post unliked successfully!" : "Post liked successfully!"));
            } else {
                toast.error(res.data.message || "An error occurred while liking/disliking the post.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while liking/disliking the post.");
        }
    }

    const deletePostHandler = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error("User is not authenticated.");
            return;
        }
    
        try {
            const res = await axios.delete(`${BASE_URL}/api/posts/${post.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Delete Post API Response:', res.data); // Log the response from the API
            if (res.data.message === "Post deleted successfully") {
                toast.success("Post deleted successfully!");
                fetchAllPosts(); // Fetch the latest posts
            } else {
                toast.error("An error occurred while deleting the post.");
            }
        } catch (error) {
            console.error('Delete Post Error:', error);
            if (error.response && error.response.status === 403) {
                toast.error("You do not have permission to delete this post.");
            } else {
                toast.error("An error occurred while deleting the post.");
            }
        }
    }

    const addCommentHandler = async () => {
        if (!text.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/posts/${post.id}/comments/`, {
                content: text
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log('Add Comment API Response:', res.data); // Log the response from the API
            setComments([...comments, res.data]);
            setComment(comment + 1);
            setText("");
            toast.success("Comment added successfully!");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the comment.");
        }
    }

    const likeCommentHandler = async (commentId) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error("User is not authenticated.");
            return;
        }

        try {
            const url = `${BASE_URL}/api/posts/comments/${commentId}/like/`;

            const res = await axios.post(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Like Comment API Response:', res.data); // Log the response from the API

            if (res.data.detail === "Comment liked successfully!") {
                toast.success(res.data.detail);
                // Update the comment state
                setComments(comments.map(comment => 
                    comment.id === commentId ? { ...comment, is_liked: true, likes_count: (comment.likes_count || 0) + 1 } : comment
                ));
            } else {
                toast.error(res.data.detail || "An error occurred while liking the comment.");
            }
        } catch (error) {
            console.error('Like Comment Error:', error);
            if (error.response && error.response.status === 400) {
                toast.error("Bad request. Please check the request parameters.");
            } else {
                toast.error("An error occurred while liking the comment.");
            }
        }
    }

    const unlikeCommentHandler = async (commentId) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error("User is not authenticated.");
            return;
        }

        try {
            const url = `${BASE_URL}/api/posts/comments/${commentId}/unlike/`;

            const res = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Unlike Comment API Response:', res.data); // Log the response from the API

            if (res.data.detail === "Comment unliked successfully!") {
                toast.success(res.data.detail);
                // Update the comment state
                setComments(comments.map(comment => 
                    comment.id === commentId ? { ...comment, is_liked: false, likes_count: (comment.likes_count || 1) - 1 } : comment
                ));
            } else {
                toast.error(res.data.detail || "An error occurred while unliking the comment.");
            }
        } catch (error) {
            console.error('Unlike Comment Error:', error);
            if (error.response && error.response.status === 400) {
                toast.error("Bad request. Please check the request parameters.");
            } else {
                toast.error("An error occurred while unliking the comment.");
            }
        }
    }

    const unfollowHandler = () => {
        toast.success("Unfollowed successfully!");
    }

    const savePostHandler = () => {
        setBookmarked(!bookmarked);
        toast.success(bookmarked ? "Post unsaved!" : "Post saved!");
    }

    const sharePostHandler = () => {
        // toast.success("Post shared successfully!");
    }

    const hideOrReportHandler = () => {
        toast.success("Post hidden or reported!");
    }

    return (
        <div className='bg-[#343434] p-3 rounded-xl shadow-md max-w-2xl border-2 border-[#cab3fe] mx-auto text-white'> {/* Change background and text color */}
            <div className='flex items-center mb-2'> 
                <Avatar className='w-8 h-8 rounded-full mr-2'>
                    <AvatarImage src={post.profile_photo ? post.profile_photo : 'https://via.placeholder.com/150'} alt={post.created_by} />
                    <AvatarFallback>{post.created_by?.[0]}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <span className='font-bold text-sm'>{post.created_by}</span>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='ml-auto p-1 bg-transparent text-white'> 
                            <MoreHorizontal />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='bg-[#2b2b2b] text-white border-none'>
                        <div className='flex flex-col text-left'>
                            {/* <button onClick={unfollowHandler} className='p-2 text-white text-left'>
                                Unfollow
                            </button> */}
                            <button onClick={savePostHandler} className='p-2 text-white text-left'>
                                {bookmarked ? "Unsave Post" : "Save Post"}
                            </button>
                            <button onClick={sharePostHandler} className='p-2 text-white text-left'>
                                Share
                            </button>
                            {/* <button onClick={hideOrReportHandler} className='p-2 text-white text-left'>
                                Hide or Report
                            </button> */}
                            {!isExplorePage && (
                                <button onClick={deletePostHandler} className='p-2 text-white text-left'>
                                    Delete Post
                                </button>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <p className='mb-2 text-sm lg:ml-5'>{post.content}</p> 
            {post.media && (
                <>
                    {console.log('Image URL:', post.media)} {/* Log the image URL */}
                    <img src={`${CLOUDINARY_BASE_URL}${post.media}`} alt={post.content} className='w-full h-auto max-w-[600px] max-h-[600px] object-cover rounded-lg mx-auto mb-4 sm:mb-2' /> {/* Add margin-bottom for small screens */}
                </>
            )} 
            <div className='flex items-center mb-2 ml-5'> {/* Align like, comment, and share in a line */}
                <div className='flex items-center mr-4 ml gap-1'>
                    <button onClick={likeOrDislikeHandler} className='mr-2 text-white'> 
                        {liked ? <FaHeart className='text-red-500' size={20} /> : <FaRegHeart size={20} />}
                    </button>
                    <span className='sm:inline'>{postLike}</span> {/* Show count on all screens */}
                    <span className='hidden sm:inline'> likes</span> {/* Hide text on small screens */}
                </div>
                <div className='flex items-center mr-4 gap-1'>
                    <button onClick={() => setShowComments(!showComments)} className='mr-2 text-white'> 
                        <MessageCircle size={20} />
                    </button>
                    <span className='sm:inline'>{comment}</span> {/* Show count on all screens */}
                    <span className='hidden sm:inline'> comments</span> {/* Hide text on small screens */}
                </div>
                <div className='flex items-center gap-1'>
                    <button onClick={sharePostHandler} className='mr-2 text-white'> 
                        <FaPaperPlane />
                    </button>
                    <span className='sm:inline'>{shares}</span> {/* Show count on all screens */}
                    <span className='hidden sm:inline'> shares</span> {/* Hide text on small screens */}
                </div>
            </div>
            {showComments && (
                <div>
                    <CommentDialog open={showComments} setOpen={setShowComments} postId={post.id} />
                    <div className='flex items-center mt-2'>
                        <input
                            type='text'
                            value={text}
                            onChange={changeEventHandler}
                            className='flex-grow p-2 rounded-md bg-[#2c2c2e] text-white'
                            placeholder='Add a comment...'
                        />
                        <Button onClick={addCommentHandler} className='ml-2 bg-[#cab2ff] hover:bg-[#a655d1] text-black'>
                            <FaPaperPlane />
                        </Button>
                    </div>
                    <div className='mt-4'>
                        {comments.map(comment => (
                            <div key={comment.id} className='flex items-center mb-2'>
                                <span className='mr-2'>{comment.content}</span>
                                <button onClick={() => comment.is_liked ? unlikeCommentHandler(comment.id) : likeCommentHandler(comment.id)} className='text-white'>
                                    {comment.is_liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                                </button>
                                <span className='ml-2'>{comment.likes_count || 0} likes</span> {/* Only show the number of likes */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;