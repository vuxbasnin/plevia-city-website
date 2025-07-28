'use client';

import React from 'react';
import Image from 'next/image';
import LibImage from '../LibImage/LibImage';
import './LibImageHome.css';

const LibImageHome: React.FC = () => {

    return (
        <div className="libimage-home-container">
            <div className="libimage-home-grid">
                <LibImage />
            </div>
        </div>
    );
};

export default LibImageHome;
