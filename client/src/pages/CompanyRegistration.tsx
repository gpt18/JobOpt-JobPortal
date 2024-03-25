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


export const CompanyRegistration: React.FC = () => {

    const [formData, setFormData] = useState({
        companyName: '',
        websiteLink: '',
        companySize: '',
        companyLogo: '',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
        console.log(formData)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        

    }


    return (
        <>
            <div className="py-5">
                <Card className="w-[350px] mx-auto">
                    <CardHeader>
                        <CardTitle>Create Profile</CardTitle>
                        <CardDescription>Provide your company details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4 my-3" onSubmit={() => handleFormSubmit}>
                            <div className="space-y-1">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" name="companyName" type="text" placeholder="Example Company Pvt. Ltd" onChange={handleOnChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="websiteLink">Website Link</Label>
                                <Input id="websiteLink" name="websiteLink" type="text" placeholder="www.example.com" onChange={handleOnChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="companySize">Company Size</Label>
                                <Select name='companySize' onValueChange={(value) => (setFormData(formData => ({...formData, companySize: value})))} defaultValue={formData.companySize}>
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
                                <Label htmlFor="companyLogo">Company Logo (Link)</Label>
                                <Input id="companyLogo" name="companyLogo" type="text" placeholder="http://example.com/logo.jpg" onChange={handleOnChange} />
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