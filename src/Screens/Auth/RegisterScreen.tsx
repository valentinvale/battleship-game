import Register from "../../Components/Register"
import { useAuth } from "../../Hooks/AuthContext";
import { register } from "../../api/api"

const RegisterScreen = () => {

    const auth = useAuth();

    const handleRegister = async (email: string, password: string) => {
        auth.register(email, password).then(() => {
            auth.login(email, password);
        }).catch((error) => {
            console.log(error);
        });
        
    }

    return <Register onSubmit={handleRegister}/>
}
export default RegisterScreen;