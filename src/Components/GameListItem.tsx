import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View<{color: string}>`
    padding : 10px;
    border : 1px solid ${({color}) => color};
    border-radius : 5px;
    margin : 10px;
`;

const GameListItem: React.FC<{game: any, color: string}> = ({game, color}) => {

    useEffect(() => {
        console.log(game);
    }, []);

    return (
        <Container color={color}>
            <Text>
                {game.id}
            </Text>
            <Text>
                {game.player1.email}
            </Text>
        </Container>
    );
}

export default GameListItem;