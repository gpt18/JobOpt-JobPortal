import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { sendOtp } from "@/services/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { data } = await sendOtp({ email });

            toast({
                description: `${data.message}`
            });

            localStorage.setItem('email', email);

            navigate('verify-otp');

        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }




    }


    return (
        <>
            <Button variant={"ghost"} className="absolute top-10 right-10" onClick={() => navigate('/')}> Home </Button>
            <form onSubmit={handleLogin}>
                <div className="max-w-md mx-auto flex flex-col justify-center items-center text-center">
                    <h1 className="text-xl font-semibold">Register or Login</h1>
                    <p className="text-gray-700 pt-1 pb-6">Enter your email below to continue</p>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" required />
                    <Button type="submit" className="mt-3" disabled={loading}>Get OTP</Button>
                </div>
            </form>

        </>
    );
}