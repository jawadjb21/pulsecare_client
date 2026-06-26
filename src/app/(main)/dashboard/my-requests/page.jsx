import MyRequests from '@/components/dashboard/MyRequests';
import { getSession } from '@/lib/getSession';
import React from 'react';

const page = async () => {
    const user = await getSession();
    return (
        <MyRequests user={user}></MyRequests>
    );
};

export default page;