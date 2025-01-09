"use client"
import React, { use, useEffect } from 'react';
import { LoginPage } from './LoginPage';
import { FeedPage } from './FeedPage';
import { RightSidebar } from './RightSidebar';
import { Layout } from './Layout';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { logout, selectAppLoading, selectIsLogged, setUserAsync } from '@/lib/store/features/appSlice';
import { LoadingSpinner } from './Spinner';

const SocialApp = () => {
    const isLogin = useAppSelector(selectIsLogged);
    const isAppLoading = useAppSelector(selectAppLoading)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const token = localStorage.getItem("jwt_token")
        if (!token) {
            dispatch(logout())
            return
        }
        dispatch(setUserAsync(token))
    }, [])

    useEffect(() => {
    }, [isLogin, isAppLoading])


    if (isAppLoading) {
        return <div className='h-[100vh] w-[100vw] flex justify-center items-center'><LoadingSpinner /></div>
    }

    if (!isLogin) {
        return <LoginPage />;
    }

    return (
        <Layout>
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