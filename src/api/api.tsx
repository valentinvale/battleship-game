const baseURL = "https://malamute-enabled-yak.ngrok-free.app"

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
            "Content-Type": "application/json"
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