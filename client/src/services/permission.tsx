import { toast } from "@/components/ui/use-toast";
import { Role } from "@/lib/role";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type PermissionProps = {
    children: React.ReactNode;
    role: Role[];
};

export default function RestrictedRouteTo({ children, role }: PermissionProps) {
    const navigate = useNavigate();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        const checkPermission = async () => {
            const token = localStorage.getItem("__token");
            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Unauthorized",
                    description: "Please login to continue.",
                });
                navigate("/login");
            }

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/p`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (data.success && role.includes(data.role.toLowerCase())) setPermission(true);
                else {
                    toast({
                        variant: "destructive",
                        title: "Unauthorized",
                        description: "Please login to continue.",
                    });
                    navigate("/login");
                }

            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
                navigate("/login");
            }
        };

        checkPermission();
    }, []);


    return <>{permission ? children : null}</>;
}