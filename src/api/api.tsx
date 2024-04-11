// const baseURL = "https://malamute-enabled-yak.ngrok-free.app"
const baseURL = "http://163.172.177.98:8081"

export const login = async (email: string, password: string): Promise<string> => {
    const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({email, password})
    });
    // return await response.json();

    const data = await response.json();

    if (response.ok) {
        //console.log(data.accessToken);
        return data.accessToken;
    } else {
        throw new Error(data.message);
    }

}

export const register = async (email: string, password: string) => {
    const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({email, password})
    });
    
    const data = await response.json();

    if (response.ok) {
        return data.accessToken;
    } else {
        throw new Error(data.message);
    }
}

export const listGames = async (token: string) => {
    const response = await fetch(`${baseURL}/game`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    //console.log(data);

    if (response.ok) {
        console.log(data);
        return data;
    } else {
        throw new Error(data.message);
    }
}

export const createGame = async (token: string) => {
    const response = await fetch(`${baseURL}/game`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export const loadGame = async (token: string, gameId: string) => {
    const response = await fetch(`${baseURL}/game/${gameId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        //console.log(data);
        return data;
    } else {
        throw new Error(data.message);
    }
}

export const joinGame = async (token: string, gameId: string) => {
    const response = await fetch(`${baseURL}/game/join/${gameId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        console.log("TEST join", data);
    } else {
        throw new Error(data.message);
    }
}

export const getUserDetals = async (token: string) => {
    const response = await fetch(`${baseURL}/user/details/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        return data;
    } else {
        throw new Error(data.message);
    }
}

export const sendMapConfiguration = async (token: string, gameId: string, shipsConfigs: any[] ) => {

    const ships = shipsConfigs.map((ship) => {
        return {
            x: ship.positionX,
            y: ship.positionY,
            size: ship.length,
            direction: ship.direction
        }
    });

    const response = await fetch(`${baseURL}/game/${gameId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ships})
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        //return data;
    } else {
        throw new Error(data.message);
    }
}
