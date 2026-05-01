import React from 'react';
import { Outlet } from 'react-router-dom';


export const AuthLayout: React.FC = () => {
    return (
        <div className="flex-1 flex justify-center items-center p-8">
            <Outlet />
        </div>
    );
};
