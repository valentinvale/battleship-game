import { useNavigation } from "@react-navigation/native";
import Login from "../../Components/Login"
import { createGame, listGames, loadGame, login } from "../../api/api"
import { AuthRoutesNames } from "../../Router/routeNames";
import { useAuth } from "../../Hooks/AuthContext";
import { Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GameListItem from "../../Components/GameListItem";
import styled from "styled-components/native";
import { Header } from "react-native/Libraries/NewAppScreen";

const LobbyScreen = () => {

    const auth = useAuth();

    const [games, setGames] = useState<any[]>([]);

    const Container = styled.View`
        flex: 1;
        width: 100%;
    `;

    const HeaderContainer = styled.View`
        background-color: grey;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom-width: 2px;
    `;


    const CreateGameButton = styled.TouchableOpacity`
        width: 80%;
        height: 50px;
        background-color: #3498db;
        justify-content: center;
        align-items: center;
    `;

    const TitleText = styled.Text`
        font-size: 44px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #fff;
    `;

    const ButtonText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    `;
    
    useEffect(() => {
        listGames(auth.token).then((games) => {
            setGames(games.games);
            //console.log(games);
        }).finally(() => {
            console.log(games);
        })
    }, [])

    const handleCreateGame = async () => {
        await createGame(auth.token);
        await listGames(auth.token).then((games) => {
            setGames(games.games);
        })
    }


    return (
        <>
            <HeaderContainer>
                <TitleText>Games</TitleText>
                <CreateGameButton onPress={handleCreateGame}>
                    <ButtonText>Create Game</ButtonText>
                </CreateGameButton>
            </HeaderContainer>
            
        <Container>
            <FlatList
                data={games}
                renderItem={({item}) => <GameListItem id={item.id} player1Mail={item.player1.email} onPress={() => loadGame(auth.token, item.id)} status={item.status} color="#3498db"/>}
                keyExtractor={(item) => item.id}
            />
        </Container>
        </>
        
    )
    
}
export default LobbyScreen;