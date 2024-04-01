import { Footer } from "@/components/cFooter";
import { Header } from "@/components/cHeader";
import { CSideBar } from "@/components/cSideBar";
import { getCompanyProfile } from "@/services/company";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { setProfile } from "@/state/slices/companySlice";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";



export const CompanyHome: React.FC = () => {
    const navigate = useNavigate();

    const { balance, email } = useAppSelector(state => state.company);
    const dispatch = useAppDispatch();

    const token = localStorage.getItem('__token');

    useEffect(() => {
        const AppStartup = () => {
           

            if(!token) {
                toast({
                    variant: "destructive",
                    title: "Unauthorized",
                    description: "Please login to continue.",
                });
                navigate('/login', { replace: true })
            };

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        if(token){
            AppStartup();
        }
        
    }, [token])


    useEffect(() => {


        const fetchProfile = async () => {
            const email = localStorage.getItem('email');
            if(email){
                try {
                    const { data } = await getCompanyProfile({email});
                    
                    if(data.profile){
                        dispatch(setProfile({
                            cid: data.cid,
                            email: data.email,
                            balance: data.balance,
                            name: data.name,
                            website: data.website,
                            size: data.size,
                            logo: data.logo,
                        }))
                    } else{
                        toast({
                            title: "Incomplete Profile",
                            description: "Please complete your profile to continue.",
                        });
                        navigate('/login/company/create-profile', { replace: true })
                    }

                } catch (error: any) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.message,
                    });
                    navigate('/login', { replace: true })
                }
            }
            else{
                navigate('/login', { replace: true })
            }
        }

        fetchProfile();
    }, [])

    return (
        <>
            <div className="bg-indigo-100 min-h-screen relative">
                <div id="company-home">
                    <Header title="Company Dashboard" email={email} balance={balance}/>
                    <div id='main-body' className="container max-w-4xll mx-auto p-2 lg:p-4">
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