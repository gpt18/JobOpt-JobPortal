import { Badge } from "@/components/ui/badge";
import React from "react";

export const CompanyAccount: React.FC = () => {
    return (
        <>
            <div className="md:px-4">
                <div className="flex justify-between">
                    <div className="text-3xl lg:text-5xl font-light">
                        Account
                    </div>
                </div>
                <div className="
                py-4">
                    <div className="text-gray-600 font-semibold">Your Balance</div>
                    <div className="flex font-medium">
                        <div className="text-lg">₹</div>
                        <div className="text-3xl">345.00</div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="text-xl lg:text-2xl font-light">
                        Transaction History
                    </div>
                    <div className="my-3 border divide-y-2 rounded-md">
                        <TransactionCard/>
                        <TransactionCard/>
                        <TransactionCard/>
                        <TransactionCard/>
                        <TransactionCard/>
                    </div>
                </div>
            </div>
        </>
    );
}


const TransactionCard: React.FC = () => {
    return (
        <div className="p-2 flex justify-between">
            <div>
                <div className="font-semibold text-lg">Payment Recieved</div>
                <div className="text-gray-600 text-sm">26th March, 2024 05:54 AM</div>
            </div>
            <div className="flex flex-col justify-end items-center">
                <Badge variant={"secondary"}>Debit</Badge>
                <div className="font-medium text-xl">+₹200</div>
            </div>

        </div>
    );
}
