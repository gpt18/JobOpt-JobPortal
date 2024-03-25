import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast";
import { verifyOtp } from "@/services/auth";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const OtpVerify: React.FC = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = React.useState("");
    const [timeLeft, setTimeLeft] = useState(5 * 60);
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    React.useEffect(() => {
        const d = localStorage.getItem("email");
        if (d) setEmail(d);
    }, [])

    React.useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);


    const handleVerifyOtp = async (e: any) => {
        e.preventDefault();

        try {
            const { data } = await verifyOtp({ email, otp });

            toast({
                title: "Message",
                description: `${data.message}`,
            });

            if(data.success){
                if(!data.role){
                    navigate('/login/select-role', {replace: true});
                }else if(data.role){
                   switch (data.role){
                    case 'student':
                        navigate('/student', {replace: true});
                        break;
                    case 'company':
                        navigate('/company', {replace: true});
                        break;
                   }
                }
            }

        } catch (error:any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Button variant="outline" size="icon" className="absolute top-10 left-10" onClick={() => navigate(-1)}> <ArrowLeft /> </Button>
            <form onSubmit={handleVerifyOtp}>
                <div className="space-y-2 max-w-md mx-auto flex flex-col justify-center items-center text-center">
                    <h1 className="text-xl font-semibold">One-Time Password</h1>
                    <p className="text-xs text-gray-700">{email}</p>
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(otp) => setOtp(otp)}

                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="shadow-lg" />
                            <InputOTPSlot index={1} className="shadow-lg" />
                            <InputOTPSlot index={2} className="shadow-lg" />
                            <InputOTPSlot index={3} className="shadow-lg" />
                            <InputOTPSlot index={4} className="shadow-lg" />
                            <InputOTPSlot index={5} className="shadow-lg" />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="text-center text-sm">
                        {otp === "" && (
                            <>Enter your one-time password.</>
                        )}
                    </div>
                    {
                        timeLeft != 0 ?
                            <div>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>
                            : <Button variant={"link"}>Re-Send</Button>
                    }
                    <Button type="submit" className="mt-3" disabled={!(otp.length === 6)}>Submit OTP</Button>
                </div>
            </form>
        </>
    );
}