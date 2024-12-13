import React, { useEffect, useState } from 'react';
import './Layout.css'; // Import the CSS file

const Layout = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isSmallScreen) {
        return (
            <div className="flex items-center justify-center min-h-screen px-2 bg-[#323032]">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        ); // Render children centered with padding for smaller screens
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black">
            <div className="absolute top-0 left-0 right-0 flex items-start justify-center">
                <h1 className="hola-text">
                    hola
                </h1>
            </div>
            <div className="relative w-full max-w-screen-sm mt-20 px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;