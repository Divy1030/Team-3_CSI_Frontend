import React from 'react';

const ProgressIndicator = ({ step }) => {
    return (
        <div className="flex items-center justify-center mb-6">
            <div className="flex items-center w-4/5 max-w-md">
                <div className="relative flex items-center w-full">
                    <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-purple-700' : 'bg-gray-300'} z-10`}></div>
                    <div className={`flex-grow h-1 ${step >= 2 ? 'bg-purple-700' : 'bg-gray-300'} z-0`}></div>
                    <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-purple-700' : 'bg-gray-300'} z-10`}></div>
                    <div className={`flex-grow h-1 ${step >= 3 ? 'bg-purple-700' : 'bg-gray-300'} z-0`}></div>
                    <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-purple-700' : 'bg-gray-300'} z-10`}></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressIndicator;