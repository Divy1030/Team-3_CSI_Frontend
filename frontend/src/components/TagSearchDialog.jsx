import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import axios from 'axios';
import Post from './Post';
import { Dialog, DialogContent } from './ui/dialog';
import { toast } from 'sonner';

const TagSearchDialog = ({ isOpen, onClose, searchTerm, handleSearchChange }) => {
  const [posts, setPosts] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagPosts, setTagPosts] = useState([]);
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPosts();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm) {
      const tags = posts
        .flatMap(post => post.tags || [])
        .filter(tag => tag.includes(searchTerm));
      setFilteredTags([...new Set(tags)]);
    } else {
      setFilteredTags([]);
    }
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://hola-project.onrender.com/api/posts/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPosts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching posts.");
    }
  };

  const handleTagClick = (tag) => {
    const tagPosts = posts.filter(post => (post.tags || []).includes(tag));
    setSelectedTag(tag);
    setTagPosts(tagPosts);
    setPostDialogOpen(true);
  };

  const getTagPostCount = (tag) => {
    return posts.filter(post => (post.tags || []).includes(tag)).length;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-[#2b2b2b] text-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center w-full p-2 rounded-lg">
                <div className="relative flex items-center w-full">
                  <Search className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tags"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent text-white placeholder-gray-400 outline-none pl-10 border border-[#baacf3] rounded-lg py-2"
                  />
                </div>
                <button className="text-gray-400 hover:text-white p-2 rounded-full ml-2" onClick={onClose}>
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
              {filteredTags.map(tag => (
                <div key={tag} className="flex items-center gap-3 p-4 hover:bg-gray-900 cursor-pointer" onClick={() => handleTagClick(tag)}>
                  <div className="w-10 h-10 rounded-full bg-[#463c78] flex items-center justify-center text-white">
                    #
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium">#{tag}</p>
                    <p className="text-xs text-gray-400">{getTagPostCount(tag)} posts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
        <DialogContent className="p-4 bg-[#2b2b2b] text-white rounded-xl shadow-lg max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Posts with #{selectedTag}</h2>
            <button className="text-gray-400 hover:text-white p-2 rounded-full" onClick={() => setPostDialogOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            {tagPosts.map(post => (
              <Post key={post.id} post={post} removePost={(id) => setTagPosts(tagPosts.filter(p => p.id !== id))} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TagSearchDialog;