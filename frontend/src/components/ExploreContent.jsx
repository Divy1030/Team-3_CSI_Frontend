import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent } from './ui/dialog';
import Post from './Post';
import SearchDialog from './SearchDialog';
import TagSearchDialog from './TagSearchDialog';
import CommunitySearchDialog from './CommunitySearchDialog';

const UNSPLASH_ACCESS_KEY = 'andbjaLD5dIb-tpqW47BC_2oTcN5tGIOxrolAqAVO3Y'; // Replace with your Unsplash API key

const ExploreContent = () => {
  const [selectedOption, setSelectedOption] = useState('Top');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAccountsDialog, setShowAccountsDialog] = useState(false);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [showCommunityDialog, setShowCommunityDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    // Fetch random images from Unsplash
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
          params: { count: 20 },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });

        console.log('API Response:', response); // Log the entire response

        if (response.data && Array.isArray(response.data)) {
          const images = response.data.map((image, index) => {
            console.log('Image:', image); // Log each image object
            return {
              id: index + 1,
              created_by: { username: image.user.username, profilePicture: image.user.profile_image.small },
              content: image.description || 'No description',
              media: image.urls.regular,
              tags: image.tags ? image.tags.map(tag => tag.title) : [],
            };
          });
          setPosts(images);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      try {
        const response = await axios.get(`http://hola-project.onrender.com/api/accounts/users/`, {
          params: { search: e.target.value },
        });
        console.log('Search API Response:', response.data); // Log the response from the API
        setUsers(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      setUsers([]);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTags = Array.from(new Set(posts.flatMap(post => post.tags)))
    .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#2b2b2b] text-white p-4 rounded-lg shadow-md w-full">
      <div className="flex flex-wrap justify-center space-x-4 mb-4">
        {['Top', 'Accounts', 'Tags', 'Community'].map(option => (
          <button
            key={option}
            className={`px-2 py-1 text-sm sm:text-base rounded-3xl mb-2 ${selectedOption === option ? 'bg-[#9384c9] text-white' : 'bg-white text-black'}`}
            onClick={() => {
              setSelectedOption(option);
              if (option === 'Accounts') {
                setShowAccountsDialog(true);
              } else if (option === 'Tags') {
                setShowTagsDialog(true);
              } else if (option === 'Community') {
                setShowCommunityDialog(true);
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption === 'Top' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
            <div key={post.id} className="cursor-pointer" onClick={() => setSelectedPost(post)}>
              <img src={post.media} alt={post.content} className="w-full h-auto object-cover rounded-lg" />
            </div>
          ))}
        </div>
      )}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="p-0 flex flex-col bg-transparent shadow-none border-none w-full h-full justify-center items-center">
            <Post post={selectedPost} removePost={() => setSelectedPost(null)} />
          </DialogContent>
        </Dialog>
      )}
      <SearchDialog
        isOpen={showAccountsDialog}
        onClose={() => setShowAccountsDialog(false)}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredUsers={filteredUsers}
      />
      <TagSearchDialog
        isOpen={showTagsDialog}
        onClose={() => setShowTagsDialog(false)}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredTags={filteredTags}
        posts={posts}
      />
      <CommunitySearchDialog
        isOpen={showCommunityDialog}
        onClose={() => setShowCommunityDialog(false)}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredCommunities={filteredCommunities}
      />
    </div>
  );
};

export default ExploreContent;