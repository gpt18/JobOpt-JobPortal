import { getAppliedJobs } from "@/services/student";
import { useAppSelector } from "@/state/hooks";
import React from "react";
import { Link } from "react-router-dom";

export const AppliedJobs = () => {

    const [AppliedJobs, setAppliedJobs] = React.useState([]);
    const { sid } = useAppSelector(s => s.student)

    React.useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const { data } = await getAppliedJobs({ sid });
                setAppliedJobs(data.appliedJobs);
            } catch (error: any) {
                console.log(error.message);
            }
        }

        if (sid) fetchAppliedJobs();
    }, [sid]);

    return (
        <>
            <div className="md:px-4">
                <div className="flex justify-between">
                    <div className="text-3xl lg:text-5xl font-light">
                        Applied Jobs
                    </div>

                </div>
                <div className="my-10">
                    <div className="space-y-4">

                        {
                            [...AppliedJobs].reverse().map((job: any) => (
                                <JobCard
                                    key={job.job._id}
                                    id={job.job._id}
                                    title={job.job.roleName}
                                    location={job.job.location}
                                    minCTC={job.job.minCTC}
                                    maxCTC={job.job.maxCTC}
                                    rr={job.job.rr}
                                    company={job.job.postedBy.companyName}
                                    logo={job.job.postedBy.companyLogo}
                                    website={job.job.postedBy.websiteLink}
                                    date={job.date} />

                            ))
                        }


                    </div>
                </div>
            </div>
        </>
    );
}


interface JobCardProps {
    id: string;
    title: string;
    location: string;
    minCTC: string;
    maxCTC: string;
    rr: number;
    company: string;
    logo: string;
    website: string;
    date: string;
}

const JobCard = ({ title, location, minCTC, maxCTC, rr, company, logo, website, date }: JobCardProps) => {

    date = new Date(date).toLocaleDateString();

    return (
        <div className="border shadow rounded">
            <div className="px-4 pt-4 text-xs text-gray-600 font-bold">
                Applied on: {date}
            </div>
            <div className="space-y-2">
                <div className="flex p-4 gap-2">
                    <div className="w-[100px] flex justify-center items-center">
                        <img src={logo} alt={company} className="w-16 h-16 object-contain" />
                    </div>
                    <div>
                        <div className="text-lg font-bold">
                            <Link to={website} target="_blank" className="text-black">{company}</Link>
                        </div>
                        <div className="text-lg font-semibold">
                            {title}
                        </div>
                        <div className="text-gray-500">
                            {location}
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4">
                    <div className="flex-1">
                        <div className="text-sm text-gray-500">
                            Job offer
                        </div>
                        <div className="text-gray-500 font-bold">
                            Salary: {minCTC} LPA - {maxCTC} LPA
                        </div>
                    </div>
                    <div className="font-bold">
                        You spent: ₹{rr - rr / 5}
                    </div>

                </div>

            </div>


        </div>
    );
}