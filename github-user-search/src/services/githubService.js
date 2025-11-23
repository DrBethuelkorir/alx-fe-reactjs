import axios from 'axios'

const SEARCH_URL = 'https://api.github.com/search/users?q='
const USER_URL = 'https://api.github.com/users/'

export const searchUsers = async (location = '', minRepos = 0) => {
    try {
        // Build query with location and minimum repositories
        let queryParts = [];
        
        if (location) {
            queryParts.push(`location:${encodeURIComponent(location)}`);
        }
        
        if (minRepos > 0) {
            queryParts.push(`repos:>${minRepos}`);
        }
        
        // If no specific filters, search for all users
        const query = queryParts.length > 0 ? queryParts.join('+') : 'type:user';
        
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