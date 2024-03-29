import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash } from "lucide-react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { calculatePostRR, getIndianCities, postJob } from "@/services/company";
import { setBalance, updatePost } from "@/state/slices/companySlice";
import { toast } from "@/components/ui/use-toast";

export const CompanyDashboard: React.FC = () => {


    return (
        <>
            <div className="md:px-4">
                <div className="flex justify-between">
                    <div className="text-3xl lg:text-5xl font-light">
                        Posted Job Roles
                    </div>
                    <AddPostButton />
                </div>
                <div className="my-10">
                    <div className="space-y-4">
                        <JobCard
                            title="Software Develpoper Associate role intern"
                            location="Noida"
                            minCTC="3.5"
                            maxCTC="10"
                            applied={100} />

                    </div>
                </div>
            </div>
        </>
    );
}

const AddPostButton = () => {
    const { addJob, balance, cid } = useAppSelector(state => state.company);
    const dispatch = useAppDispatch();

    const { roleName, location, minCTC, maxCTC, rr } = addJob;

    const [loading, setLoading] = useState(false);

    const [indianCities, setIndianCities] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        dispatch(updatePost({
            [e.target.name]: e.target.value,
        }));

    };

    useEffect(() => {
        const calculateRR = () => {
            dispatch(updatePost({
                rr: calculatePostRR({ roleName, location })
            }));
        }
        calculateRR();
    }, [roleName, location])

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await getIndianCities();
                data.sort((a: any, b: any) => a.name.localeCompare(b.name));
                setIndianCities(data);
            } catch (error: any) {
                console.log(error.message);
            }
        }

        fetchCities();
    }, []);

    const handleJobPost = async () => {
        try {
            setLoading(true);
            const { data } = await postJob({
                cid,
                roleName,
                location,
                minCTC,
                maxCTC
            });

            if(data.success){
                dispatch(updatePost({
                    roleName: '',
                    location: '',
                    minCTC: '',
                    maxCTC: '',
                    rr: 0
                }));
                dispatch(setBalance(data.balance));

            }

            toast({
                variant: data.success ? "default" : "destructive",
                title: data.message,
            })
        } catch (error: any) {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,

            })
        }

        setLoading(false);
    }

    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button>Add Job Post</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Job Post</SheetTitle>
                    <SheetDescription>
                        Add new job post here. Click post when you're done.
                    </SheetDescription>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="roleName" className="text-right">
                                Role Name
                            </Label>
                            <Input id="roleName" name="roleName" value={roleName} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Select name="location" onValueChange={(value) => {
                                dispatch(updatePost({
                                    location: value,
                                }))
                            }}>
                                <SelectTrigger id="location" className="w-[15.5rem]" value={location}>
                                    <SelectValue placeholder={location} />
                                </SelectTrigger>
                                <SelectContent >
                                    {indianCities.map((city: any) => (
                                        <SelectItem key={city.id} value={city.name}>{city.name} - {city.state}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="minCTC" className="text-right">
                                Min CTC (in Lac)
                            </Label>
                            <Input id="minCTC" className="col-span-3" value={minCTC} name="minCTC" onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="maxCTC" className="text-right">
                                Max CTC (in Lac)
                            </Label>
                            <Input id="maxCTC" value={maxCTC} className="col-span-3" name="maxCTC" onChange={handleChange} />
                        </div>
                        <div className="text-center">
                            <div>
                                Your Balance: ₹{balance}
                            </div>
                            <div className="font-bold">
                                RR (Required Rupees): ₹{`${rr}`}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button type="submit" className="w-full" onClick={handleJobPost} disabled={loading}>
                            {loading ? "Posting..." : "Post"}
                        </Button>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    );
}

interface JobCardProps {
    title: string;
    location: string;
    minCTC: string;
    maxCTC: string;
    applied: number;
}

const JobCard = ({ title, location, minCTC, maxCTC, applied }: JobCardProps) => {
    return (
        <div className="border shadow rounded">
            <div className="space-y-2 p-3">
                <div className="text-lg font-medium ">
                    {title}
                </div>
                <Badge variant="secondary">Location: {location}</Badge>
                <div className="flex gap-2">
                    <Badge variant="outline">MinCTC: {minCTC} lpa</Badge>
                    <Badge variant="outline">MaxCTC: {maxCTC} lpa</Badge>
                </div>
                <div className="flex justify-between">
                    <Badge variant="outline">Applied: {applied}</Badge>
                    <div className="">
                        <Button variant={"ghost"} size={"icon"} > <Pencil size={16} /> </Button>
                        <Button variant={"ghost"} size={"icon"} className="text-red-700"> <Trash size={16} /> </Button>
                    </div>
                </div>
            </div>


        </div>
    );
}