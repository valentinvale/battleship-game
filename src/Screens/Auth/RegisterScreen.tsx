import Register from "../../Components/Register"
import { useAuth } from "../../Hooks/AuthContext";
import { register } from "../../api/api"

const RegisterScreen = () => {

    const auth = useAuth();

    return <Register onSubmit={auth.register}/>
}
export default RegisterScreen;