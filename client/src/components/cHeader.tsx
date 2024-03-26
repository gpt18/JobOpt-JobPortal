import { getCompanyBalance } from "@/services/company";
import { IndianRupee, MailIcon } from "lucide-react";
import React from "react";

export const Header: React.FC = () => {

    const [companyData, setCompanyData] = React.useState({
        email: '',
        balance: 0,
    });

    React.useEffect(() => {
        const handleemailset = () => {
            const email = localStorage.getItem('email');
            const cid = localStorage.getItem('cid');

            if (email) {
                setCompanyData(companyData => ({ ...companyData, email }));
            }
            return cid;
        }
    
        const handlegetbalance =  async (cid: string | null) => {
            if (cid) {
                const {data} = await getCompanyBalance({cid});
                if(data.balance) {
                    setCompanyData(companyData => ({ ...companyData, balance: data.balance }));
                }
            }
        }
    
        const cid = handleemailset();
        handlegetbalance(cid);
    }, [])

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
                            {companyData.email}
                        </div>
                        <div className="flex justify-center sm:justify-end gap-2">
                            <IndianRupee />
                            Balance: {companyData.balance}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}