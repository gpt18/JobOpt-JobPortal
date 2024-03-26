import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Delete, Edit } from "lucide-react";



export const CompanyDashboard: React.FC = () => {
    return (
        <>
            <div className="md:px-4">
                <div className="flex justify-between">
                    <div className="text-3xl lg:text-5xl font-light">
                        Posted Job Roles
                    </div>
                    <Button>Add Post</Button>
                </div>
                <div className="my-10">
                    <div className="space-y-4">
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    </div>
                </div>
            </div>
        </>
    );
}

const JobCard: React.FC = () => {
    return (
        <div className="border shadow rounded py-2 px-3">
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <div className="text-lg font-medium ">
                                    Software Develpoper
                                </div>
                                <Badge variant="secondary">Location: Noida</Badge>
                                <div className="flex gap-2">
                                    
                                    <Badge variant="outline">MinCTC: 3.5 lpa</Badge>
                                    <Badge variant="outline">MaxCTC: 10 lpa</Badge>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="text-center content-center border py-2 px-3 rounded">
                                    <div className="text-sm text-gray-600">Applied</div>
                                    <div className="text-2xl font-bold">100</div>
                                </div>
                                <div className="flex flex-col gap-2 px-3">
                                    <Button variant={"outline"} size={"icon"}> <Edit/> </Button>
                                    <Button variant={"outline"} size={"icon"}> <Delete/> </Button>
                                </div>
                            </div>

                        </div>
                    </div>
    );
}