import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaInstagram, FaFacebook, FaEnvelope, FaPencilAlt } from 'react-icons/fa';
import CreatePost from './CreatePost';
import axios from 'axios';
import Post from './Post';
import Comment from './Comment';
import { toast } from 'sonner';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import Loader from './Loader'; // Import a loader component

const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState('Posts');
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profilePhotoLoading, setProfilePhotoLoading] = useState(false); // State for profile photo loading
  const [backgroundPhotoLoading, setBackgroundPhotoLoading] = useState(false); // State for background photo loading

  const BASE_URL = 'https://hola-project.onrender.com';
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dy1a8nyco/';
  const userId = localStorage.getItem('userId'); // Get the user ID from local storage

  useEffect(() => {
    fetchProfile();
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (profile.id) {
      if (selectedOption === 'Posts') {
        fetchPosts();
      } else if (selectedOption === 'Comments') {
        fetchComments();
      } else if (selectedOption === 'Media') {
        fetchMedia();
      } else if (selectedOption === 'Followers') {
        fetchFollowers();
      } else if (selectedOption === 'Following') {
        fetchFollowing();
      }
    }
  }, [selectedOption, profile.id]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/accounts/profile/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(res.data); 
      setProfile(res.data);
      setBio(res.data.bio || '');
      fetchFollowersCount(); // Fetch followers count to get the actual number of followers
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching profile.");
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/accounts/profile/${profile.id}/posts/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching posts.");
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/posts/comments/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setComments(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching comments.");
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/posts/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const mediaPosts = res.data.filter(post => post.media);
      setMedia(mediaPosts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching media.");
      setLoading(false);
      console.log();
      
    }
  };

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/accounts/followers/26/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Followers API Response:', res.data); // Log the response from the API
      const filteredFollowers = res.data.filter(follower => follower.id !== userId); // Filter out the user's own profile
      setFollowers(filteredFollowers);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching followers.");
      setLoading(false);
    }
  };

  const fetchFollowersCount = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/accounts/followers/26/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const filteredFollowers = res.data.filter(follower => follower.id !== userId); // Filter out the user's own profile
      setProfile(prevProfile => ({
        ...prevProfile,
        num_followers: filteredFollowers.length
      }));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching followers count.");
    }
  };

  const fetchFollowing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/accounts/following/${profile.id}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setFollowing(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching following.");
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageDialogOpen(true);
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePhoto) formData.append('profile_photo', profilePhoto);
    if (backgroundPhoto) formData.append('background_photo', backgroundPhoto);

    try {
      setProfilePhotoLoading(true);
      setBackgroundPhotoLoading(true);
      const res = await axios.put(`${BASE_URL}/api/accounts/profile/edit/`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(res.data);
      toast.success("Profile updated successfully!");
      setProfileSettingsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile.");
    } finally {
      setProfilePhotoLoading(false);
      setBackgroundPhotoLoading(false);
    }
  };

  const activityOptions = screenWidth < 770 ? ['Posts', 'Followers', 'Following'] : ['Posts', 'Comments', 'Media', 'Likes', 'Followers', 'Following'];


  return (
    <div className="w-full">
      <div className="bg-[#101011] text-white p-4 rounded-t-lg shadow-md w-full border-2 border-[#a698d7] mt-5">
      
        <div className="relative">
        <img className="w-full h-48 object-cover rounded-t-lg" src={profile.background_photo ? `${CLOUDINARY_BASE_URL}${profile.background_photo}` : "https://via.placeholder.com/600x200"} alt="Cover" />
          <div className="absolute left-4 bottom-[10px] transform translate-y-1/2">
          <img className="w-24 h-24 rounded-full border-4 border-[#101011] object-cover" src={profile.profile_photo ? `${CLOUDINARY_BASE_URL}${profile.profile_photo}` : "https://via.placeholder.com/150"} alt="Profile" />
          </div>
        </div>
        <div className="mt-12 p-4">
          <div className="flex justify-end space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaEnvelope className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaPencilAlt className="w-5 h-5" />
            </a>
          </div>
          <div className="text-center md:text-left mt-4">
            <h2 className="text-xl font-semibold">{profile.username}</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="md:w-1/2">
              <p className="text-sm text-gray-400">{profile.bio || "I'm delighted to introduce myself as a passionate photographer!"}</p>
              {/* <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <p className="text-sm text-gray-400">New York, USA</p>
              </div> */}
              <button className="mt-2 bg-transparent border-2 border-[#a698d7] text-white px-4 py-2 rounded-3xl" onClick={() => setProfileSettingsOpen(true)}>Profile Settings</button>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center md:justify-end space-x-4">
              <div className="text-center">
                <span className="text-lg font-bold">{profile.num_posts}</span>
                <span className="block text-gray-400 text-xs">Posts</span>
              </div>
              <div className="border-l border-white h-6"></div> {/* Divider */}
              <div className="text-center">
                <span className="text-lg font-bold">{profile.num_followers}</span>
                <span className="block text-gray-400 text-xs">Followers</span>
              </div>
              <div className="border-l border-white h-6"></div> {/* Divider */}
              <div className="text-center">
                <span className="text-lg font-bold">{profile.num_following}</span>
                
                <span className="block text-gray-400 text-xs">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
   
      <div className="bg-[#101011] text-white p-4 border-2 border-[#a698d7] border-t-0 rounded-t-lg mt-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Activity</h3>
          <span className="text-sm text-gray-400">{profile.num_followers} Followers</span>
          <button className="bg-[#baacf3] text-black px-4 py-2 rounded-lg" onClick={() => setOpen(true)}>Create Post</button>
        </div>
        <div className="flex justify-between items-center mt-4 space-x-4 border-t border-[#a698d7] pt-2">
          {activityOptions.map(option => (
            <button
              key={option}
              className={`px-4 py-2 ${selectedOption === option ? 'border-b-2 border-[#a698d7] text-white' : 'text-gray-400'}`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>


      {selectedOption === 'Posts' && (
        <div className="bg-[#101011] text-white p-4 border-2 border-[#a698d7] border-t-0 rounded-t-lg mt-4 space-y-4 mb-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map(post => (
              <Post key={post.id} post={post} removePost={(id) => setPosts(posts.filter(p => p.id !== id))} />
            ))
          )}
        </div>
      )}

  
      {selectedOption === 'Comments' && (
        <div className="bg-[#101011] text-white p-4 border-2 border-[#a698d7] border-t-0 rounded-t-lg mt-4 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} postId={comment.post} />
            ))
          )}
        </div>
      )}

 
      {selectedOption === 'Media' && (
        <div className="bg-[#101011] text-white p-4 border-2 border-[#a698d7] border-t-0 rounded-t-lg mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            media.map(post => (
              <img
                key={post.id}
                src={`${BASE_URL}${post.media}`}
                alt={post.content}
                className='w-full h-auto object-cover rounded-lg cursor-pointer'
                onClick={() => handleImageClick(`${BASE_URL}${post.media}`)}
              />
            ))
          )}
        </div>
      )}


      {selectedOption === 'Followers' && (
        <div className="bg-[#101011] text-white p-4 border-2 border-[#a698d7] border-t-0 rounded-t-lg mt-4 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            followers.map(follower => (
              <div key={follower.id} className="flex items-center space-x-4">
                <img src={follower.profile_photo ? `${BASE_URL}${follower.profile_photo}` : "https://via.placeholder.com/50"} alt={follower.username} className="w-10 h-10 rounded-full" />
                <p>{follower.username}</p>
              </div>
            ))
          )}
        </div>
      )}

    
      {selectedOption === 'Following' && (
        <div className="bg-[#101011] text-white p-4 border-2 border-[#a698d7] border-t-0 rounded-t-lg mt-4 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            following.map(follow => (
              <div key={follow.id} className="flex items-center space-x-4">
                <img src={follow.profile_photo ? `${BASE_URL}${follow.profile_photo}` : "https://via.placeholder.com/50"} alt={follow.username} className="w-10 h-10 rounded-full" />
                <p>{follow.username}</p>
              </div>
            ))
          )}
        </div>
      )}

  
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="p-0 flex justify-center items-center bg-transparent">
          {selectedImage && (
            <img src={selectedImage} alt="Selected" className='w-full h-auto object-cover rounded-lg' />
          )}
        </DialogContent>
      </Dialog>

   
      <Dialog open={profileSettingsOpen} onOpenChange={setProfileSettingsOpen}>
        <DialogContent className="p-4 bg-[#2b2b2b] text-white rounded-xl shadow-lg max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#b1a3e5] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#2c2c2e] text-white p-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Profile Photo</label>
              <input
                type="file"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-400"
              />
              {profilePhotoLoading && <Loader />} {/* Conditionally render loader */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Background Photo</label>
              <input
                type="file"
                onChange={(e) => setBackgroundPhoto(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-400"
              />
              {backgroundPhotoLoading && <Loader />} {/* Conditionally render loader */}
            </div>
            <Button onClick={handleProfileUpdate} className='w-full bg-[#cab2ff] hover:bg-[#a655d1] text-black'>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserProfile;