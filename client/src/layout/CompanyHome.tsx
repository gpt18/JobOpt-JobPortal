import { Footer } from "@/components/cFooter";
import { Header } from "@/components/cHeader";
import React from "react";
import { Outlet } from "react-router-dom";

export const CompanyHome: React.FC = () => {


    return (
        <>
            <div className="bg-indigo-100 min-h-screen relative">
                <div id="company-home">
                    <Header />
                    <div id='main-body' className="container max-w-4xll mx-auto p-2 lg:p-4 ">
                        <div className="bg-white rounded-md p-4">
                            <Outlet />
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>

        </>
    );
}