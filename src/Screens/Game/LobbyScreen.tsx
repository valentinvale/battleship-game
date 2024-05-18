import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Login from "../../Components/Login"
import { createGame, listGames, loadGame, login } from "../../api/api"
import { AuthRoutesNames, GameRoutesNames } from "../../Router/routeNames";
import { useAuth } from "../../Hooks/AuthContext";
import { Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GameListItem from "../../Components/GameListItem";
import styled from "styled-components/native";
import { Header } from "react-native/Libraries/NewAppScreen";


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
    padding-top: 20px;
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

const LobbyScreen = () => {

    const auth = useAuth();

    const navigation = useNavigation<any>();

    const [games, setGames] = useState<any[]>([]);
    
    useEffect(() => {
        listGames(auth.token).then((games) => {
            setGames(games.games);
            //console.log(games);
        }).finally(() => {
            console.log(games);
        })
    }, [])

    const fetchGames = async () => {
        try {
            const response = await listGames(auth.token);
            setGames(response.games);
        } catch (error) {
            console.error("Failed to fetch games:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchGames();
            return () => {};
        }, [auth.token])
    );

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
                renderItem={({item}) => <GameListItem id={item.id} player1Mail={item.player1.email} onPress={() => navigation.navigate(GameRoutesNames.TABLE, {gameId: item.id})} status={item.status} color="#3498db"/>}
                keyExtractor={(item) => item.id}
            />
        </Container>
        </>
        
    )
    
}
export default LobbyScreen;