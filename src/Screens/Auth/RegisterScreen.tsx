import Register from "../../Components/Register"
import { register } from "../../api/api"

const RegisterScreen = () => {
    return <Register onSubmit={register}/>
}
export default RegisterScreen;