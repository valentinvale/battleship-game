import { useNavigation } from "@react-navigation/native";
import Login from "../../Components/Login"
import { listGames, login } from "../../api/api"
import { AuthRoutesNames } from "../../Router/routeNames";
import { useAuth } from "../../Hooks/AuthContext";
import { Text, FlatList  } from "react-native";
import React, { useEffect, useState } from "react";
import GameListItem from "../../Components/GameListItem";

const TableScreen = () => {

    const auth = useAuth();

    const [games, setGames] = useState<any[]>([]);
    
    useEffect(() => {
        listGames(auth.token).then((games) => {
            setGames(games.games);
            //console.log(games);
        }).finally(() => {
            console.log(games);
        })
    }, [])

    return (
        <>
            <Text>Games</Text>
            <FlatList
                data={games}
                renderItem={({item}) => <GameListItem game={item} color="#3498db"/>}
                keyExtractor={(item) => item.id}
            />
        </>
    )
    
}
export default TableScreen;