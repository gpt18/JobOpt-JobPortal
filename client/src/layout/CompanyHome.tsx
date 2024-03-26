import { Footer } from "@/components/cFooter";
import { Header } from "@/components/cHeader";
import { CSideBar } from "@/components/cSideBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Outlet } from "react-router-dom";


export const CompanyHome: React.FC = () => {

    React.useEffect(() => {

    }, []);

    return (
        <>
            <div className="bg-indigo-100 min-h-screen relative">
                <div id="company-home">
                    <Header />
                    <div id='main-body' className="container max-w-4xll mx-auto p-2 lg:p-4 ">
                        <div className="bg-white rounded-md p-4">
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="col-span-4 md:col-span-1">
                                    <CSideBar />
                                </div>
                                <div className="col-span-4 md:col-span-3">
                                    <Outlet />
                                </div>
                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

        </>
    );
}