"use client"
import React from 'react';
import { ProfileSidebar } from './ProfileSidebar';
import { PeopleSuggestions } from './People/PeopleSuggestions';


// Updated Layout Component
export const RightSidebar = () => {
    return (
        <div className="w-64 space-y-6">
            <ProfileSidebar />
            <PeopleSuggestions />
        </div>
    );
};