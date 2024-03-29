import { useAppSelector } from "@/state/hooks";
import { IndianRupee, MailIcon } from "lucide-react";
import React from "react";

export const Header: React.FC = () => {

    const { balance, email } = useAppSelector(state => state.company);
    
    return (
        <>
            <div id="header" className="top-0 sticky">
                <div className="p-4 bg-black text-white flex flex-col justify-center text-center sm:flex-row sm:justify-between">
                    <div className="text-3xl">
                        Company Dashboard
                    </div>
                    <div className="flex flex-col py-2 sm:p-0">
                        <div className="flex justify-center sm:justify-end gap-2">
                            <MailIcon />
                            {email}
                        </div>
                        <div className="flex justify-center sm:justify-end">
                            <div>Balance: </div>
                            <div className="flex justify-center items-center">
                            <IndianRupee size={16}/>{balance}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}