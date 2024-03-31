import { Footer } from "@/components/cFooter";
import { Header } from "@/components/cHeader";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { setProfile } from "@/state/slices/studentSlice";
import { toast } from "@/components/ui/use-toast";
import { getStudentProfile } from "@/services/student";
import { SSideBar } from "@/components/sSideBar";



export const StudentHome: React.FC = () => {
    const navigate = useNavigate();

    const { balance, email } = useAppSelector(state => state.student);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const fetchProfile = async () => {
            const email = localStorage.getItem('email');
            if(email){
                try {
                    const { data } = await getStudentProfile({email});
                    dispatch(setProfile({
                        sid: data.sid,
                        email: data.email,
                        balance: data.balance,
                        name: data.name,
                        phone: data.phone,
                        location: data.location,
                        profilePic: data.profilePic,
                        resume: data.resume,
                    }))
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
                    <Header title="Student Dashboard" email={email} balance={balance}/>
                    <div id='main-body' className="container max-w-4xll mx-auto p-2 lg:p-4">
                        <div className="bg-white rounded-md p-4">
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="col-span-4 md:col-span-1">
                                    <SSideBar />
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