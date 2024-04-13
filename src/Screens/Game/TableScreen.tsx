import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";

import { Text, ScrollView } from "react-native";
import { GameContext, useGameContext } from "../../Hooks/GameContext";

import ShipMapInput from "../../Components/ShipMapInput";

import { Picker } from "@react-native-picker/picker";

import Table, { ICell } from "../../Components/Table";

import styled from "styled-components/native";
import { useAuth } from "../../Hooks/AuthContext";
import { joinGame, sendMapConfiguration, strike } from "../../api/api";

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

const PlayerToMoveText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ReplayGameButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    background-color: #3498db;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const TableScreen = () => {

    const route = useRoute<any>();

    const gameContext = useGameContext();
    const auth = useAuth();

    const [playerConfiguration, setPlayerConfiguration] = React.useState<string[][]>(
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
    );

    const [opponentConfiguration, setOpponentConfiguration] = React.useState<string[][]>(
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
    );

    const [playerConfigurationReplay, setPlayerConfigurationReplay] = React.useState<string[][]>(
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
    );

    const [opponentConfigurationReplay, setOpponentConfigurationReplay] = React.useState<string[][]>(
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
    );

    const [replayIndex, setReplayIndex] = React.useState<number>(0);
    const [isReplaying, setIsReplaying] = React.useState<boolean>(false);
    
    useEffect(() => {
        const fetchGame = async () => {
            await gameContext.loadGame(route.params.gameId);
        };
    
        fetchGame();
    }, [route.params.gameId]);
    
    useEffect(() => {
        if (gameContext.game) {
            console.log("Game loaded, player to move ID:", gameContext.game.playerToMoveId);
            console.log("JOCUL: ", gameContext.game);
            console.log("Auth ID:", auth.id);
            console.log("Verification:", gameContext.game.playerToMoveId === auth.id);
            getPlayerConfiguration();
            getOpponentConfiguration();
        }
    }, [gameContext.game]);

    // useEffect(() => {
    //     gameContext.loadGame(route.params.gameId).then(() => {
    //         console.log(gameContext);
    //         console.log("misca player ul cu id ul ", gameContext.game?.playerToMoveId);
    //         console.log("auth id ", auth.id);
    //         console.log("VERIFICARE ", gameContext.game?.playerToMoveId === auth.id)
    //         getPlayerConfiguration();
    //     }
    //     );
        
    // }, []);

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

    const getPlayerConfiguration = () => {
        if (gameContext.game) {
            if(gameContext.game.status === 'ACTIVE' || gameContext.game.status === 'FINISHED'){
                console.log("SHIPSS: ", gameContext.game.shipsCoord);
                const config = [['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','','']];

                gameContext.game?.shipsCoord?.forEach((ship) => {
                    if(ship.hit){
                        config[ship.y - 1][ship.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'X';
                    }
                    else{
                        config[ship.y - 1][ship.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'O';
                    }
                });

                gameContext.game?.moves.forEach((move) => {
                    if(move.playerId !== auth.id){
                        if(move.result === false){
                            config[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'm';
                        }
                    }
                }
                );
                console.log("CONFIG", config);
                setPlayerConfiguration(config);
            }
        }
    }

    const getOpponentConfiguration = () => {
        if(gameContext.game){
            if(gameContext.game.status === 'ACTIVE' || gameContext.game.status === 'FINISHED'){
                console.log("MISCARI: ", gameContext.game.moves);
                const config = [['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','',''],
                                ['','','','','','','','','','']];

                gameContext.game.moves.forEach((move) => {
                    if(move.playerId === auth.id){
                        if(move.result){
                            console.log("HIT: ", typeof(move.playerId), typeof(auth.id), move.playerId, auth.id);
                            config[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'X';
                        }
                        else{
                            config[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'O';
                        }
                    }
                    
                });
                setOpponentConfiguration(config);
            }
        }
    }

    const handleStrike = (cell: ICell) => {
        try{

            

            if(gameContext.game?.status === 'ACTIVE' && gameContext.game?.playerToMoveId === auth.id){

                //verifica daca e deja ocupata celula 
                if(opponentConfiguration[cell.y - 1][cell.x.charCodeAt(0) - 'A'.charCodeAt(0)] !== ''){
                    console.log("Celula ocupata");
                    return;
                }

                strike(auth.token, gameContext.game.id, cell.x, cell.y).then(() => {
                    gameContext.loadGame(route.params.gameId).then(() => {
                        getOpponentConfiguration();
                    });
                    
                }
                );
            }
            else{
                console.log("Nu este randul tau");
            
            }
        }
        catch (error){
            console.log("eroare la strike", error);
        }
    }

    const getWinnerName = () => {
        if(gameContext.game?.status === 'FINISHED'){
            const lastPlayerToMoveId = gameContext.game?.moves[gameContext.game?.moves.length - 1].playerId;
            if(lastPlayerToMoveId === gameContext.game?.player1.id){
                return gameContext.game?.player1?.email;
            }
            else{
                return gameContext.game?.player2.email;
            }
        }
    }

    useEffect(() => {
        if(gameContext.game){
            if (isReplaying && replayIndex < gameContext.game?.moves.length) {
                const timer = setTimeout(() => {
                    handleReplay(replayIndex);
                    setReplayIndex(replayIndex + 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else if (replayIndex >= gameContext.game?.moves.length) {
                setPlayerConfigurationReplay([
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','','']]
                )
                setOpponentConfigurationReplay([
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','',''],
                    ['','','','','','','','','','']]
                )

                                            
                setReplayIndex(0);
                setIsReplaying(false);
            }
        }
        
    }, [replayIndex, isReplaying]);

    const handleReplay = (index: number) => {
        const move = gameContext.game?.moves[index];
        if (move) {
            if (move.playerId === gameContext.game?.player1.id) {
                const newConfig = opponentConfigurationReplay.map((row) => [...row]);
                if (move.result) {
                    newConfig[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'X';
                } else {
                    newConfig[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'O';
                }
                setOpponentConfigurationReplay(newConfig);
            } else {
                const newConfig = playerConfigurationReplay.map((row) => [...row]);
                if (move.result) {
                    newConfig[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'X';
                } else {
                    newConfig[move.y - 1][move.x.charCodeAt(0) - 'A'.charCodeAt(0)] = 'O';
                }
                setPlayerConfigurationReplay(newConfig);
            }
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
                {gameContext.game?.status === 'ACTIVE' ? (
                    <PlayerToMoveText>
                        {gameContext.game?.playerToMoveId === gameContext.game?.player1Id ? gameContext.game?.player1.email + "'s turn" : gameContext.game?.player2.email + "'s turn"}
                    </PlayerToMoveText>
                ) : null}

                {
                    gameContext.game?.status === 'FINISHED' ? (
                        <PlayerToMoveText>{getWinnerName()} won!</PlayerToMoveText>
                    ) : null
                }

                {(gameContext.game?.status === 'ACTIVE' || gameContext.game?.status === 'FINISHED') && (auth.id === gameContext.game?.player1.id || auth.id === gameContext.game?.player2?.id) ? (
                    console.log("ID-uri", gameContext.game?.player1.id, gameContext.game?.player2?.id, auth.id),
                    <>
                        <TableContainer>
                    <Table onCellPress={handleStrike} state={
                        opponentConfiguration
                    } />
                    </TableContainer>

                    <TableContainer>
                        <Table state={
                            playerConfiguration
                    } />
                    </TableContainer>
                    </>
                ) : null}
                
                {(gameContext.game?.status === 'MAP_CONFIG') && (auth.id === gameContext.game.player1Id || auth.id === gameContext.game.player2Id) ? (
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

                {gameContext.game?.status === 'FINISHED' ? (
                    <ReplayGameButton onPress={() => setIsReplaying(true)}>
                        <ButtonText>Replay Game</ButtonText>
                    </ReplayGameButton>
                ) : null}

                {gameContext.game?.status === 'FINISHED' ? (
                    <TableContainer>
                        <Table state={opponentConfigurationReplay} />
                    </TableContainer>
                ) : null}

                {gameContext.game?.status === 'FINISHED' ? (
                    <TableContainer>
                        <Table state={playerConfigurationReplay} />
                    </TableContainer>
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