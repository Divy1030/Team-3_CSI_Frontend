
import React from 'react';
import { FaStar } from 'react-icons/fa'; 

const PremiumSubscription = () => {
  return (
    <div className='mb-4 p-4 border-2 border-[#cab3fe] rounded-lg'> 
      <p className='text-sm mb-2 text-white'>Grow professionally with Premium</p>
      <div className='flex items-center'>
        <FaStar className='text-yellow-500 mr-2' /> 
        <h2 className='text-lg font-bold text-white'>Try 1 month for $0</h2>
      </div>
    </div>
  );
};

export default PremiumSubscription;