import { FormControl } from "@/components/ui/form"
import { loginSchema } from "@/schemas/auth/login.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {


    const form = useForm({
        resolver: zodResolver(loginSchema()),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <FormControl>

        </FormControl>
    )
}

export default LoginPage