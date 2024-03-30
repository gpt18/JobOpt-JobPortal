import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getAccountHistory } from "@/services/company";
import { useAppSelector } from "@/state/hooks";
import { RotateCcw } from "lucide-react";
import React from "react";

export const CompanyAccount: React.FC = () => {
    const { balance, cid } = useAppSelector(s => s.company);

    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        document.title = "Company Account | Job Portal";
    },[]);

    React.useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data } = await getAccountHistory({ id: cid });
                setTransactions(data.transactions);
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
            }
        }

        if (cid) fetchTransactions();
    }, [cid]);


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
                        <div className="text-3xl">{balance}.00</div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="text-xl lg:text-2xl font-light space-x-2">
                        <span>Transaction History</span>
                        <span><Button variant={"ghost"} size={"icon"}><RotateCcw size={16}/></Button></span>
                    </div>
                    <div className="my-3 border divide-y-2 rounded-md">
                        {[...transactions].reverse().map((t: any) => (
                            <TransactionCard key={t.id} title={t.reason} date={t.date} amount={t.amount} type={t.type} id={t._id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

interface TransactionProps {
    id: string;
    title: string;
    date: string;
    amount: number;
    type: "credit" | "debit";

}

const TransactionCard = ({ title, date, amount, type, id }: TransactionProps) => {
    const d = new Date(date);
    const formattedDate = d.toLocaleString('en-US', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true}); 

    return (
        <div className="py-3 px-2 flex justify-between">
            <div>
                <div>
                <Badge variant={"secondary"} className={type === "credit" ? "bg-green-700 text-white" : "bg-red-700 text-white"}>
                {type}
                </Badge>
                <Badge variant={"secondary"}>Txn: {id}</Badge>
                </div>
                <div className="font-semibold text-lg">{title}</div>
                <div className="text-gray-600 text-sm">{formattedDate}</div>
            </div>
            <div className="flex flex-col justify-center items-center shrink-0">

                <div className="font-medium text-2xl">{type === "credit" ? "+" : "-"}₹{amount}</div>
            </div>

        </div>
    );
}
