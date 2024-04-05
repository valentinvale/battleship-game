import { useNavigation } from "@react-navigation/native";
import Login from "../../Components/Login"
import { login } from "../../api/api"
import { AuthRoutesNames } from "../../Router/routeNames";
import { useAuth } from "../../Hooks/AuthContext";

const LoginScreen = () => {

    const navigation = useNavigation<any>();

    const auth = useAuth();

    const handleGoToRegister = () => {
        navigation.navigate(AuthRoutesNames.REGISTER)
    }

    return <Login onSubmit={auth.login} goToRegister={handleGoToRegister}/>
}
export default LoginScreen;