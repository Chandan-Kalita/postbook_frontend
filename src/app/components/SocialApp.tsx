"use client"
import React from 'react';
import { LoginPage } from './LoginPage';
import { FeedPage } from './FeedPage';
import { RightSidebar } from './RightSidebar';
import { Layout } from './Layout';

const SocialApp = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    if (!isLoggedIn) {
        return <LoginPage setLoginStatus={setIsLoggedIn} />;
    }

    return (
        <Layout setLoginStatus={setIsLoggedIn}>
            <div className="flex-grow">
                <FeedPage />
            </div>
            <div className="hidden lg:block">
                <RightSidebar />
            </div>
        </Layout>
    );
};

export default SocialApp;