import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { selectRole } from "@/services/register";
import React from "react";
import { useNavigate } from "react-router-dom";

export const RoleSelection: React.FC = () => {
    const navigate = useNavigate();


    const handleRoleSelection = async (role: string) => {
        const email = localStorage.getItem('email');

        if (email) {
            const { data } = await selectRole({ email, role });

            toast({
                description: data.message
            });

            if (data.success) {
                localStorage.setItem('role', data.role);

                switch (data.role) {
                    case 'student':
                        if(data.profile) navigate('/student', { replace: true });
                        else navigate('/login/student/create-profile', { replace: true });
                        break;
                    case 'company':
                        if(data.profile) navigate('/company', { replace: true });
                        else navigate('/login/company/create-profile', { replace: true });
                        break;
                }
            }else{
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: data.message,
                });
                navigate('/login', { replace: true })
            }

        }
        else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Login again with your email",
            });
            navigate('/login', { replace: true })
        }

    }

    return (
        <>
            <h1 className="text-xl font-bold absolute top-10 left-10" > Register As </h1>
            <div className="max-w-md mx-auto flex flex-col justify-center items-center text-center space-y-4">
                <div>
                    <h1 className="text-xl font-semibold">Select Your Role</h1>
                    <p className="text-gray-700">Once selected can't be change.</p>
                </div>
                <div className="flex gap-4 justify-stretch">
                    <Button variant={"outline"} onClick={() => handleRoleSelection('company')}>
                        Company
                    </Button>
                    <Button variant={"outline"} onClick={() => handleRoleSelection('student')}>
                        Student
                    </Button>
                </div>
            </div>
        </>
    );
}