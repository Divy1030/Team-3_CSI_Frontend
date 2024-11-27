import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import Post from './Post';

const SavedPostsDialog = ({ isOpen, onClose, savedPosts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl bg-[#2b2b2b] text-white rounded-xl shadow-lg border-none">
        <div className="flex items-center p-4">
          <button className="text-white hover:text-white mr-2" onClick={onClose}>
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Saved</h2>
        </div>
        <p className="text-sm text-white p-4">All posts</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-h-[600px] overflow-y-auto scrollbar-hide">
          {savedPosts.map(post => (
            <div key={post.id} className="cursor-pointer" onClick={() => setSelectedPost(post)}>
              <img src={post.media} alt={post.content} className="w-full h-auto object-cover rounded-lg" />
            </div>
          ))}
        </div>
        {selectedPost && (
          <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
            <DialogContent className="p-0 flex flex-col bg-transparent shadow-none border-none w-full h-full justify-center items-center">
              <Post post={selectedPost} removePost={() => setSelectedPost(null)} />
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SavedPostsDialog;