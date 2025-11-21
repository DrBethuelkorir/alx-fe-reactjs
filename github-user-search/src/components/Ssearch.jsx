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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        GitHub User Search
                    </h1>
                    <p className="text-lg text-gray-600">
                        Find any GitHub user by their username
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-grow">
                            <input
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                type="text"
                                value={username}
                                onChange={handleChange}
                                placeholder="Enter GitHub username (e.g., octocat, torvalds)"
                                disabled={loading}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
                            disabled={loading || !username.trim()}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </div>
                            ) : (
                                "Search User"
                            )}
                        </button>
                    </form>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Searching for {username}...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
                        <div className="text-red-600 text-lg font-semibold mb-2">
                            User Not Found
                        </div>
                        <p className="text-red-500">{error}</p>
                        <p className="text-gray-600 text-sm mt-2">
                            Try checking the spelling or search for a different username
                        </p>
                    </div>
                )}

                {/* User Card */}
                {userData && (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <img 
                                        src={userData.avatar_url} 
                                        alt={`${userData.login}'s avatar`} 
                                        className="w-32 h-32 rounded-full border-4 border-purple-200 shadow-md"
                                    />
                                </div>
                                
                                {/* User Info */}
                                <div className="flex-grow">
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                            {userData.name || userData.login}
                                        </h2>
                                        {userData.login && userData.name && (
                                            <p className="text-gray-500 text-lg">
                                                @{userData.login}
                                            </p>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {userData.bio || "No bio available"}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="text-center bg-gray-50 rounded-lg p-3">
                                            <div className="text-xl font-bold text-purple-600">
                                                {userData.followers}
                                            </div>
                                            <div className="text-sm text-gray-500">Followers</div>
                                        </div>
                                        <div className="text-center bg-gray-50 rounded-lg p-3">
                                            <div className="text-xl font-bold text-purple-600">
                                                {userData.following}
                                            </div>
                                            <div className="text-sm text-gray-500">Following</div>
                                        </div>
                                        <div className="text-center bg-gray-50 rounded-lg p-3">
                                            <div className="text-xl font-bold text-purple-600">
                                                {userData.public_repos}
                                            </div>
                                            <div className="text-sm text-gray-500">Repositories</div>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                                        {userData.location && (
                                            <div className="flex items-center gap-1">
                                                <span>📍</span>
                                                <span>{userData.location}</span>
                                            </div>
                                        )}
                                        {userData.blog && (
                                            <div className="flex items-center gap-1">
                                                <span>🔗</span>
                                                <a 
                                                    href={userData.blog} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-purple-600 hover:text-purple-700"
                                                >
                                                    Website
                                                </a>
                                            </div>
                                        )}
                                        {userData.twitter_username && (
                                            <div className="flex items-center gap-1">
                                                <span>🐦</span>
                                                <span>@{userData.twitter_username}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Profile Link */}
                                    <a 
                                        href={userData.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        <span>View GitHub Profile</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Initial State */}
                {!loading && !error && !userData && (
                    <div className="text-center py-16">
                        <div className="text-purple-400 text-6xl mb-6">👤</div>
                        <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                            Search for a GitHub User
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Enter a GitHub username above to get detailed information about that user, 
                            including their profile, statistics, and repositories.
                        </p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="font-semibold mb-2">Popular Users</div>
                                <div>torvalds, octocat, mojombo</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="font-semibold mb-2">Get Info</div>
                                <div>Profile, stats, repos</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="font-semibold mb-2">Quick Access</div>
                                <div>Direct GitHub links</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;