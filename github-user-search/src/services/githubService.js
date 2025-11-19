import axios from 'axios'

const SEARCH_URL = 'https://api.github.com/search/users?q='
const USER_URL = 'https://api.github.com/users/'

export const searchUsers = async (query) => {
    try {
        const response = await axios.get(`${SEARCH_URL}${query}`);
        return response.data;
    } catch (error) {
        console.error("Search failed:", error);
        throw error; 
    }
}

export const fetchUserData = async (username) => {
    try {
        const response = await axios.get(`${USER_URL}${username}`);
        return response.data;
    } catch (error) {
        console.error("User fetch failed:", error);
        throw error; 
    }
}