import RegisterPage from '@/components/auth/RegisterPage';
import { postImage } from '@/lib/actions/postImage';
import React from 'react';

const page = () => {
    return (
        <RegisterPage postImage={postImage}></RegisterPage>
    );
};

export default page;