import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const CSideBar: React.FC = () => {
    return (

        <>
            <div className="md:hidden">
                <Card className="w-full p-4">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="max-w-[150px]">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" className="" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-medium">Profile Details</div>
                            <div className="text-xl mb-2">Google</div>
                            <Button variant={"secondary"} size={"sm"}><Link target="_blank" to={"http://www.google.com"}>Open Website</Link></Button>
                            <div className="">Company Size: 1-10</div>
                        </div>
                        <div className="space-x-2">
                            <Button variant={"outline"}><Link to={"/company"}>Home</Link></Button>
                            <Button variant={"outline"}><Link to={"/company/my-account"}>Account</Link></Button>
                            <Button variant={"outline"}><Link to={"/company"}>Logout</Link></Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="hidden md:block">
                <Card className="min-h-screen">
                    <div className="grid grid-rows-12">
                        <div className="row-span-3 flex flex-col items-center  p-4 space-y-4">
                            <div className="max-w-[150px] ">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" className="" />
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <div className="font-medium">Profile Details</div>
                                <div className="text-xl">Google</div>
                                <div className="">
                                    <Button variant={"secondary"} size={"sm"}><Link target="_blank" to={"http://www.google.com"}>Open Website</Link></Button>
                                </div>
                                <div className="">Team Size: 1-10</div>
                            </div>
                        </div>
                        <div className="row-start-4 row-end-12 p-4">
                            <div className="space-y-2">
                                <Button variant={"outline"} className="w-full text-start"><Link to={"/company"}>Home</Link></Button>
                                <Button variant={"outline"} className="w-full text-start"><Link to={"/company/my-account"}>Account</Link></Button>
                            </div>
                        </div>
                        <div className="row-start-12 p-4">
                            <Button variant={"outline"} className="w-full text-start">Logout</Button>
                        </div>
                    </div>

                </Card>
            </div>
        </>
    );
}