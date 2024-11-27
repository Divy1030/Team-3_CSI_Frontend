import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import Post from './Post';

const ArchivedPostsDialog = ({ isOpen, onClose, archivedPosts }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl bg-[#2b2b2b] text-white rounded-xl shadow-lg border-none">
        <div className="flex items-center p-4 border-b border-gray-700">
          <button className="text-gray-400 hover:text-white mr-2" onClick={onClose}>
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Archived</h2>
        </div>
        <div className="max-h-[700px] overflow-y-auto scrollbar-hide p-4">
          {archivedPosts.map(post => (
            <div key={post.id} className="mb-4">
              <Post post={post} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchivedPostsDialog;