import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast";
import { sendOtp, verifyOtp } from "@/services/auth";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const OtpVerify: React.FC = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    React.useEffect(() => {
        const d = localStorage.getItem("email");
        if (d) setEmail(d);
        else navigate('/login', { replace: true });
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

            if (data.success) {
                if (!data.role) {
                    navigate('/login/select-role', { replace: true });
                } else if (data.role) {
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('__token', data.token);
                    switch (data.role) {
                        case 'student':
                            if(data.profile) navigate('/student', { replace: true });
                            else navigate('/login/student/create-profile', { replace: true });
                            break;
                        case 'company':
                            if(data.profile) navigate('/company', { replace: true });
                            else navigate('/login/company/create-profile', { replace: true });
                            break;
                    }
                }
            }

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: `${error.message}`,
            });
        }
    }

    const handleResendOTP = async () => {
        try {
            const { data } = await sendOtp({ email });

            toast({
                description: `${data.message}`
            });

            setTimeLeft(30);
        } catch (error: any) {
            toast({
                variant: "destructive",
                description: `${error.message}`
            });
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
                            : <Button variant={"link"} className="text-blue-800" type="button" onClick={() => handleResendOTP()}>Re-Send</Button>
                    }
                    <Button type="submit" className="mt-3" disabled={!(otp.length === 6)}>Submit OTP</Button>
                </div>
            </form>
        </>
    );
}