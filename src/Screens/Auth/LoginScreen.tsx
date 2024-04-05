import { useNavigation } from "@react-navigation/native";
import Login from "../../Components/Login"
import { login } from "../../api/api"
import { AuthRoutesNames } from "../../Router/routeNames";

const LoginScreen = () => {

    const navigation = useNavigation<any>();

    const handleGoToRegister = () => {
        navigation.navigate(AuthRoutesNames.REGISTER)
    }

    return <Login onSubmit={login} goToRegister={handleGoToRegister}/>
}
export default LoginScreen;