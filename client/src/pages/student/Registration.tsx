import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import {
    Card,
    CardContent,
    CardDescription,
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
import { createStudentProfile } from "@/services/register";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Trophy } from "lucide-react";
import React from "react";
import { getIndianCities } from "@/services/company";



export const  StudentRegistration: React.FC = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        resume: '',
        phone: '',
        profilePic: '',
        location: '',
    });

    const [indianCities, setIndianCities] = useState([]);

    React.useEffect(() => {
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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await createStudentProfile(formData);
            
            if(data.success){
                toast({
                    title: data.message,
                    description: data.reward ? `You have earned ₹${data.reward} for creating profile` : undefined,
                });
                navigate('/student', { replace: true });
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: data.message,
                });
            }

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
                    You earn ₹300 as a registration reward.
                    </AlertDescription>
                </Alert>

                <Card className="w-[350px] mx-auto">
                    <CardHeader>
                        <CardTitle>Create Student Profile</CardTitle>
                        <CardDescription>Provide your details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4 my-3" onSubmit={handleFormSubmit}>
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name*</Label>
                                <Input id="name" name="name" type="text" placeholder="John Doe" onChange={handleOnChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="resume">Resume Link*</Label>
                                <Input id="resume" name="resume" type="text" placeholder="http://www.example.com/resume.pdf" onChange={handleOnChange} required/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="phone">Phone Number*</Label>
                                <Input id="phone" name="phone" type="text" placeholder="935XXXXX" onChange={handleOnChange} required/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="profilePic">Profile Pic* (Link)</Label>
                                <Input id="profilePic" name="profilePic" type="text" placeholder="http://example.com/pic.jpg" onChange={handleOnChange} required/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="location">Location*</Label>
                                <Select name='location' onValueChange={(value) => (setFormData(formData => ({ ...formData, location: value })))} defaultValue={formData.location} required>
                                    <SelectTrigger  id='location' >
                                        <SelectValue placeholder="Select your location" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup >
                                            <SelectLabel>Available Locations</SelectLabel>
                                            
                                            {
                                                indianCities.map((city: any) => (
                                                    <SelectItem key={city.id} value={city.name}>{city.name} - {city.state}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept terms and conditions
                                </Label>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}