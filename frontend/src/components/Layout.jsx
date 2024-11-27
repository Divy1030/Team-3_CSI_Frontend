import React from 'react';
import './Layout.css'; // Import the CSS file

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black">
            <div className="absolute top-0 left-0 right-0 flex items-start justify-center">
                <h1 className="hola-text">
                    hola
                </h1>
            </div>
            <div className="relative w-3/4 max-w-screen-sm mt-40">
                {children}
            </div>
        </div>
    );
};

export default Layout;