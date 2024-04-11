import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";

import { Text, ScrollView } from "react-native";
import { GameContext, useGameContext } from "../../Hooks/GameContext";

import ShipMapInput from "../../Components/ShipMapInput";

import { Picker } from "@react-native-picker/picker";

import Table from "../../Components/Table";

import styled from "styled-components/native";
import { useAuth } from "../../Hooks/AuthContext";
import { joinGame, sendMapConfiguration } from "../../api/api";

const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const TableContainer = styled.View`
    padding: 20px;
`;

const FormContainer = styled.View`
    width: 100%;
    padding: 20px;
    align-items: center;
`;

const JoinButton = styled.TouchableOpacity`
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


const TitleText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const SendMapConfigButton = styled.TouchableOpacity`
    width: 80%;
    height: 40px;
    background-color: #3498db;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const TableScreen = () => {

    const route = useRoute<any>();

    const gameContext = useGameContext();
    const auth = useAuth();
    console.log(gameContext);

    useEffect(() => {
        gameContext.loadGame(route.params.gameId).then(() => {
            console.log("misca player ul cu id ul ", gameContext.game?.playerToMoveId);
            console.log("auth id ", auth.id);
            console.log("VERIFICARE ", gameContext.game?.playerToMoveId === auth.id)
        }
        );
        
    }, []);

    const [shipConfigs, setShipConfigs] = React.useState<any[]>([
        { shipId: 0, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 1, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 2, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 3, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 4, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 5, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 6, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 7, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 8, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
        { shipId: 9, positionX: 'A', positionY: 1, length: 2, direction: 'VERTICAL' },
    ]);

    const handleShipConfig = (config: any) => {
        const newConfigs = shipConfigs.map((c) => {
            if (c.shipId === config.shipId) {
                return config;
            }
            return c;
        });
        setShipConfigs(newConfigs);
        console.log(newConfigs);
    }

    const handleJoinGame = () => {
        if (gameContext.game){
            joinGame(auth.token, gameContext.game.id).then(() => {
                gameContext.loadGame(route.params.gameId);
            }
            );
        }
    }

    const handleSendMapConfig = () => {
        try{
            if (gameContext.game){
                sendMapConfiguration(auth.token, gameContext.game.id, shipConfigs).then(() => {
                    gameContext.loadGame(route.params.gameId);
                }
                );
            }
        }
        catch (error){
            console.log("eroare", error);
        }
        
    }

    console.log(route.params);
    return (
        <ScrollView>
            <Container>
                <TitleText>
                    {gameContext.game?.player1.email} vs {gameContext.game?.player2 ? gameContext.game?.player2.email : 'Waiting for player'}
                </TitleText>
                {gameContext.game?.player2 === null ? (
                    <JoinButton onPress={handleJoinGame}>
                        <ButtonText>Join Game</ButtonText>
                    </JoinButton>
                ) : null}
                <TableContainer>
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
                    } />
                </TableContainer>

                <TableContainer>
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
                    } />
                </TableContainer>
                
                {gameContext.game?.status === 'MAP_CONFIG' ? (
                    <FormContainer>
                        <ShipMapInput shipId={0} length={2} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={1} length={2} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={2} length={2} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={3} length={2} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={4} length={3} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={5} length={3} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={6} length={3} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={7} length={4} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={8} length={4} onConfigChange={handleShipConfig} />
                        <ShipMapInput shipId={9} length={6} onConfigChange={handleShipConfig} />
                        <SendMapConfigButton onPress={handleSendMapConfig}>
                            <ButtonText>Send Map</ButtonText>
                        </SendMapConfigButton>
                    </FormContainer>
                ) : null}

            </Container>
        </ScrollView>
        
    );
}

export default () => (
    <GameContext>
        <TableScreen />
    </GameContext>
)