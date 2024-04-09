import React, { useState, useEffect } from "react";

import { Text } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../Hooks/AuthContext";
import { getUserDetals } from "../../api/api";

const Container = styled.View`
    margin-top: 50px;
    flex: 1;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TitleContainer = styled.View`
    margin-bottom: 20px;
    border-bottom-width: 4px;
    width: 100%;
    align-items: center;
    padding-bottom: 20px;
`;

const LogOutButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    background-color: #e74c3c;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`;

const TitleText = styled.Text`
    font-size: 44px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const DetailText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const DetailContainer = styled.View`
    margin-bottom: 20px;
    border-bottom-width: 2px;
    width: 100%;
    align-items: center;
`;


const UserDetailsScreen = () => {

    const auth = useAuth();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        getUserDetals(auth.token).then((user) => {
            setUser(user);
        })
    }, [])

    return (
        <Container>
            <TitleContainer>
                <TitleText>
                    {user?.user.email}
                </TitleText>
            </TitleContainer>
            
            <DetailContainer>
                <DetailText>
                    Games Currently Playing: {user?.currentlyGamesPlaying}
                </DetailText>
            </DetailContainer>
            
            <DetailContainer>
                <DetailText>
                    Games Won: {user?.gamesWon}
                </DetailText>
            </DetailContainer>

            <DetailContainer>
                <DetailText>
                    Games Lost: {user?.gamesLost}
                </DetailText>
            </DetailContainer>


            <LogOutButton onPress={auth.logout}>
                <ButtonText>
                    Log Out
                </ButtonText>
            </LogOutButton>
        </Container>
    );
}

export default UserDetailsScreen;