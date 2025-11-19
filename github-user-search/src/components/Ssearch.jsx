// src/components/Search.jsx
import { useState } from "react";
import { fetchUserData } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUsername(e.target.value);
        setError(null); // Clear error when user starts typing again
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError("Looks like we can't find the user");
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    className="search-input"
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter GitHub username"
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    className="search-button"
                    disabled={loading || !username.trim()}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {/* Conditional Rendering */}
            {loading && (
                <div className="message loading">
                    Loading...
                </div>
            )}

            {error && (
                <div className="message error">
                    {error}
                </div>
            )}

            {userData && (
                <div className="user-card">
                    <img 
                        src={userData.avatar_url} 
                        alt={`${userData.login}'s avatar`} 
                        className="avatar"
                    />
                    <div className="user-info">
                        <h2 className="user-name">
                            {userData.name || userData.login}
                        </h2>
                        <p className="user-bio">
                            {userData.bio || "No bio available"}
                        </p>
                        <div className="user-stats">
                            <span>Followers: {userData.followers}</span>
                            <span>Following: {userData.following}</span>
                            <span>Repos: {userData.public_repos}</span>
                        </div>
                        <a 
                            href={userData.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="profile-link"
                        >
                            View GitHub Profile
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;