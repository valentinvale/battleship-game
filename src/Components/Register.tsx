import { useState } from "react";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Input = styled.TextInput`
    width: 80%;
    height: 50px;
    border: 1px solid #000;
    margin-bottom: 10px;
    padding: 10px;
`;

const LoginButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    background-color: #3498db;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`;

export interface IRegister {
    onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<IRegister> = ({onSubmit}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => onSubmit(email, password);

    return (
        <Container>
            <Title>Register</Title>
            <Input placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
            <Input placeholder="Password" secureTextEntry onChangeText={setPassword}/>
            <LoginButton onPress={handleSubmit}>
                <ButtonText>Register</ButtonText>
            </LoginButton>
        </Container>
    );
};
export default Register;