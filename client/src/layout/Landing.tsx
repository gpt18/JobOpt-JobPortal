import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-black">
            <Button variant="secondary" className="bg-white text-black">
                <Link to={'/login'}>Login</Link>
            </Button>
        </div>
    );
}