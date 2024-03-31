import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import { applyJob, getAllJobs } from "@/services/student";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setBalance } from "@/state/slices/studentSlice";


export const StudentDashboard: React.FC = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        document.title = "Student Dashboard | Job Portal";

        const fetchJobs = async () => {
            try {
                const { data } = await getAllJobs();
                setJobs(data.jobs);
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
            }
        }

        fetchJobs();

    }, []);


    return (
        <>
            <div className="md:px-4">
                <div className="flex justify-between">
                    <div className="text-3xl lg:text-5xl font-light">
                        Open Job Roles
                    </div>

                </div>
                <div className="my-10">
                    <div className="space-y-4">

                        {
                            [...jobs].reverse().map((job: any) => (
                                <JobCard
                                    key={job._id}
                                    id={job._id}
                                    title={job.roleName}
                                    location={job.location}
                                    minCTC={job.minCTC}
                                    maxCTC={job.maxCTC}
                                    applied={job.appliedCandidatesCount}
                                    rr={job.rr}
                                    company={job.postedBy.companyName}
                                    logo={job.postedBy.companyLogo}
                                    website={job.postedBy.websiteLink} />
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
    applied: number;
    rr: number;
    company: string;
    logo: string;
    website: string;
}

const JobCard = ({ id, title, location, minCTC, maxCTC, applied, rr, company, logo, website }: JobCardProps) => {
    const [loading, setLoading] = useState(false);
    const {sid} = useAppSelector(s => s.student);
    const dispatch = useAppDispatch();

    const handleApplyJob = async (jid: string) => {
        setLoading(true);
        try {

            const { data } = await applyJob({ sid, jid });

            if(data.success){

                dispatch(setBalance(data.balance));

                toast({
                    title: "Message",
                    description: data.message
                });
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message
                });
            }

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message
            });
        }
    }

    return (
        <div className="border shadow rounded">
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
                <div className="flex px-4">
                    <div className="w-1/2">
                        <Badge variant="secondary">Applied: {applied}</Badge>
                    </div>
                    <div className="w-1/2 flex gap-2 justify-end">
                        <div>
                            Required Rupees:
                        </div>
                        <div className="font-bold">
                            ₹{rr}
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
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>Apply</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will deduct ₹{rr} amount from your account for appling this job.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleApplyJob(id)}>
                                        {loading ? "Applying..." : "Apply"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>

                </div>

            </div>


        </div>
    );
}