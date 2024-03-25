import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='text-center my-20'>
                <h1 className="font-bold text-3xl">Page Not found</h1>
                <p className=" text-gray-600">👉 { window.location.href }</p>
                <Button className='my-6' onClick={() => navigate(-1)}>Go Back</Button>
            </div>
            
        </>
    );
}