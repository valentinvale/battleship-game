import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.TouchableOpacity<{color: string}>`
    padding : 10px;
    border : 1px solid ${({color}) => color};
    border-radius : 5px;
    margin : 10px;
`;

export interface IGameListItem {
    id: string;
    onPress?: () => void;
    color: string;
    player1Mail: string;
    status: string;
}

const GameListItem: React.FC<IGameListItem> = ({id, color, player1Mail, status, onPress}) => {

    return (
        <Container onPress={onPress} color={color}>
            <Text>
                {id}
            </Text>
            <Text>
                {player1Mail}
            </Text>
            <Text>
                {status}
            </Text>
        </Container>
    );
}

export default GameListItem;