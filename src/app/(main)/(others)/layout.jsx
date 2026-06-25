import { Footer } from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import React from 'react';
import { getSession } from "@/lib/getSession";

const RootLayout = async ({ children }) => {
    const user = await getSession();
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
            <Navbar user={user}></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;