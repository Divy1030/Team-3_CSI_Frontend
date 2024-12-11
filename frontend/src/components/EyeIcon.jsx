// EyeIcon.jsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const EyeIcon = ({ isVisible, toggleVisibility }) => {
  return (
    <div onClick={toggleVisibility} className="cursor-pointer">
      {isVisible ? <EyeOff size={20} color="white" /> : <Eye size={20} color='white'/>}
    </div>
  );
};

export default EyeIcon;