import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { reset } from "@/state/slices/companySlice";

export const CSideBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { name, website, size, logo } = useAppSelector(state => state.company);

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
                        <div className="max-w-[150px]">
                            <img src={logo} alt="" className="" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-medium">Company Profile</div>
                            <div className="text-xl mb-2">{name}</div>
                            <div className="flex space-x-2">
                                <Badge variant={"secondary"}>
                                    <Link target="_blank" to={website} className="flex items-center space-x-1">
                                        <span>Website</span>
                                        <ExternalLink size={10} />
                                    </Link>
                                </Badge>
                                <Badge variant={"secondary"}>Team Size: {size}</Badge>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <Button variant={"outline"}><Link to={"/company"}>Home</Link></Button>
                            <Button variant={"outline"}><Link to={"/company/my-account"}>Account</Link></Button>
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
                            <div className="max-w-[150px] ">
                                <img src={logo} alt="" className="" />
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <div className="font-medium">Profile Details</div>
                                <div className="text-xl mb-4">{name}</div>
                                <div className="flex space-x-2">
                                    <Badge variant={"secondary"}>
                                        <Link target="_blank" to={website} className="flex items-center space-x-1">
                                            <span>Website</span>
                                            <ExternalLink size={10} />
                                        </Link>
                                    </Badge>
                                    <Badge variant={"secondary"}>Team Size: {size}</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="row-start-4 row-end-12 p-4">
                            <div className="space-y-2">
                                <Button variant={"outline"} className="w-full text-start"><Link to={"/company"}>Home</Link></Button>
                                <Button variant={"outline"} className="w-full text-start"><Link to={"/company/my-account"}>Account</Link></Button>
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