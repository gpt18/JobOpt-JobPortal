import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createCompanyProfile } from "@/services/register";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Trophy } from "lucide-react";



export const CompanyRegistration: React.FC = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: '',
        websiteLink: '',
        companySize: '',
        companyLogo: '',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await createCompanyProfile(formData);
            toast({
                title: data.message,
                description: data.reward ? `You have earned ₹${data.reward} for creating profile` : undefined,
            });

            if(data.success) navigate('/company', { replace: true });

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            });
        }

    }


    return (
        <>
            <div className="py-5">
                <Alert className="my-3 sm:my-0 sm:mb-5 ">
                    <Trophy className="h-4 w-4" />
                    <AlertTitle>Congratulations!</AlertTitle>
                    <AlertDescription>
                    You earn ₹200 as a registration reward. Complete your profile to unlock even more rewards.
                    </AlertDescription>
                </Alert>

                <Card className="w-[350px] mx-auto">
                    <CardHeader>
                        <CardTitle>Create Company Profile</CardTitle>
                        <CardDescription>Provide your company details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4 my-3" onSubmit={handleFormSubmit}>
                            <div className="space-y-1">
                                <Label htmlFor="companyName">Company Name* (+₹25)</Label>
                                <Input id="companyName" name="companyName" type="text" placeholder="Example Company Pvt. Ltd" onChange={handleOnChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="websiteLink">Website Link* (+₹50)</Label>
                                <Input id="websiteLink" name="websiteLink" type="text" placeholder="www.example.com" onChange={handleOnChange} required/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="companySize">Company Size* (+₹20)</Label>
                                <Select name='companySize' onValueChange={(value) => (setFormData(formData => ({ ...formData, companySize: value })))} defaultValue={formData.companySize} required>
                                    <SelectTrigger className="w-[180px]" id='companySize' >
                                        <SelectValue placeholder="Select company size" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup >
                                            <SelectLabel>Company Size</SelectLabel>
                                            <SelectItem value="1-10">1-10</SelectItem>
                                            <SelectItem value="11-50">11-50</SelectItem>
                                            <SelectItem value="more than 50">more than 50</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="companyLogo">Company Logo* (Link) (+₹50)</Label>
                                <Input id="companyLogo" name="companyLogo" type="text" placeholder="http://example.com/logo.jpg" onChange={handleOnChange} required/>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept terms and conditions
                                </label>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-gray-400">Note: Enter correct details and earn reward in rupees.</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}