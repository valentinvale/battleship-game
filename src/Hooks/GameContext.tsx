import React, { createContext, useState, useContext, useEffect } from "react";
import { loadGame } from "../api/api";
import { useAuth } from "./AuthContext";

enum GameStatus {
    CREATED = "CREATED",
    MAP_CONFIG = "MAP_CONFIG",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

interface User {
    id: string;
    email: string;
}

interface Move{
    id: string;
    x: string;
    y: number;
    result: boolean;
    playerId: string;
    gameId: string;
}

interface ShipCoord{
    id: string;
    x: string;
    y: number;
    gameId: string;
    playerId: string;
    hit: boolean;
}

interface Game {
        id: string;
        status:	GameStatus
        player1Id: string
        player2Id: string
        playerToMoveId:	string
        player1: User
        player2: User
        moves: Move[]
        shipsCoord?: ShipCoord[]
}

interface IGameContext{
    game: Game | null;
    loadGame: (id: string) => Promise<void>;
}

const Context = createContext<IGameContext>({
    loadGame: () => Promise.resolve(),
    game: null
});

export const GameContext: React.FC<{children: React.ReactNode}> = ({children}) => {

    const auth = useAuth();

    const [game, setGame] = useState<Game | null>(null);

    const handleLoadGame = async (id: string) => {
        try {
            const data = await loadGame(auth.token, id);
            setGame(data);
        } catch (error) {
            console.error("Error loading game", error);
        }
    }
    

    return (
        <Context.Provider value={{loadGame: handleLoadGame, game}}>
            {children}
        </Context.Provider>
    );
}

export const useGameContext = () => useContext(Context);

    