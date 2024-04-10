import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";

import { Text } from "react-native";
import { GameContext, useGameContext } from "../../Hooks/GameContext";

import Table from "../../Components/Table";

import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const TitleText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const TableScreen = () => {

    const route = useRoute<any>();

    const gameContext = useGameContext();
    console.log(gameContext);

    useEffect(() => {
        gameContext.loadGame(route.params.gameId);
    }, []);

    console.log(route.params);
    return (
        <Container>
            <TitleText>
                {gameContext.game?.player1.email} vs {gameContext.game?.player2 ? gameContext.game?.player2.email : 'Waiting for player'}
            </TitleText>
            <Table state={
                [['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','',''],
                ['','','','','','','','','','']]
            }/>

        </Container>
    );
}

export default () => (
    <GameContext>
        <TableScreen />
    </GameContext>
)