import { LayoutGridIcon } from "lucide-react";
import { constants } from '../lib/strings'
import { Outlet } from "react-router-dom";

export const Login: React.FC = () => {
    return (
        <>
            <div className="flex h-screen">
                <section id="gp-login-section-one" className="hidden md:block w-1/2  bg-black text-white">
                    <div className="flex gap-2 p-10">
                        <LayoutGridIcon /> {constants.APP_NAME}
                    </div>
                </section>
                <section id="gp-login-dection-two" className="md:w-1/2 w-full relative">
                    <div className="flex flex-col justify-center items-center w-full h-full p-8">
                       <Outlet />
                    </div>
                </section>
            </div>
        </>
    );
}