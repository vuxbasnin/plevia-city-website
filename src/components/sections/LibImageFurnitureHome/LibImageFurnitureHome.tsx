'use client';

import React from 'react';
import Image from 'next/image';
import LibImage from '../LibImage/LibImage';
import './LibImageFurnitureHome.css';

const LibImageFurnitureHome: React.FC = () => {

    return (
        <div className="libimage-furniture-home-container">
            <div className="libimage-furniture-home-grid">
                <LibImage isHideTitle={false} dataSource="furniture" />
            </div>
        </div>
    );
};

export default LibImageFurnitureHome;
