import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, LocateIcon, Pencil, Phone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { reset } from "@/state/slices/studentSlice";

export const SSideBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const handleLogout = () => {

        localStorage.clear();
        dispatch(reset());
        navigate('/', { replace: true });
    }

    return (

        <>
            <div className="md:hidden">
                <Card className="w-full p-4">
                    <div className="text-end">
                        <ProfileEditButton />
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <ProfileDetails />
                        <div className="space-x-2">
                            <Button variant={"outline"} onClick={() => navigate('/student')}>Home</Button>
                            <Button variant={"outline"} onClick={() => navigate('/student/applied-jobs')}>Applied Jobs</Button>
                            <Button variant={"outline"} onClick={() => navigate('/student/my-account')}>Account</Button>
                            <Button variant={"outline"} onClick={() => handleLogout()}>Logout</Button>
                        </div>
                    </div>


                </Card>
            </div>
            <div className="hidden md:block">
                <Card className="min-h-screen">
                    <div className="w-full text-end p-4">
                        <ProfileEditButton />
                    </div>
                    <div className="grid grid-rows-12">
                        <div className="row-span-3 flex flex-col items-center  p-4 space-y-4 border-b">
                            <ProfileDetails />
                        </div>
                        <div className="row-start-4 row-end-12 p-4">
                            <div className="space-y-2">
                            <Button variant={"outline"} className="w-full text-start" onClick={() => navigate('/student')}>Home</Button>
                            <Button variant={"outline"} className="w-full text-start" onClick={() => navigate('/student/applied-jobs')}>Applied Jobs</Button>
                            <Button variant={"outline"} className="w-full text-start" onClick={() => navigate('/student/my-account')}>Account</Button>
                            </div>
                        </div>
                        <div className="row-start-12 p-4 border-t">
                            <Button variant={"outline"} className="w-full text-start" onClick={() => handleLogout()}>Logout</Button>
                        </div>
                    </div>

                </Card>
            </div>
        </>
    );
}

const ProfileEditButton = () => {
    return (
        <>
            <Button variant={"ghost"} size={"icon"}>
                <Pencil size={16} />
            </Button>
        </>
    );
}

const ProfileDetails = () => {
    const { name, resume, location, profilePic, phone } = useAppSelector(state => state.student);
    return (
        <>

            <div className="w-[150px] h-[150px]">
                <img src={profilePic} alt={name} className="object-cover rounded-full border" />
            </div>
            <div className="flex flex-col items-center">
                <div className="font-medium">Student Profile</div>
                <div className="text-xl mb-2">{name}</div>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                    <Badge variant={"secondary"}>
                        <Link target="_blank" to={resume} className="flex items-center space-x-1">
                            <span>View Resume</span>
                            <ExternalLink size={10} />
                        </Link>
                    </Badge>
                    <Badge variant={"secondary"}><Phone size={10}/> <span className="w-2"/> {phone}</Badge>
                    <Badge variant={"secondary"}><LocateIcon size={10}/> <span className="w-2"/> {location}</Badge>
                </div>
            </div>

        </>
    );
}