import { IndianRupee, MailIcon } from "lucide-react";

interface HeaderProps {
    title: string;
    balance: number;
    email: string;
}

export const Header = ({title, balance, email}: HeaderProps) => {


    
    return (
        <>
            <div id="header" className="top-0 sticky">
                <div className="p-4 bg-black text-white flex flex-col justify-center text-center sm:flex-row sm:justify-between">
                    <div className="text-3xl">
                        {title}
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